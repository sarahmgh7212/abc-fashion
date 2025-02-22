const express = require("express");
const db = require("./database");
const ALLOWED_TABLES = ["customers", "shipments"];

const router = express.Router();

// Get paginated customers
router.get("/customers", (req, res) => {
	let { page, limit } = req.query;

	page = parseInt(page) || 1;
	limit = parseInt(limit) || 10;
	const offset = (page - 1) * limit;

	db.query(`SELECT COUNT(*) AS total FROM customers`, (err, countResult) => {
		if (err) return res.status(500).json({ error: err.message });

		const totalRecords = countResult[0].total;
		const totalPages = Math.ceil(totalRecords / limit);

		// Fetch paginated customers
		db.query(
			`SELECT * FROM customers LIMIT ? OFFSET ?`,
			[limit, offset],
			(err, results) => {
				if (err) return res.status(500).json({ error: err.message });

				res.json({
					customers: results,
					currentPage: page,
					totalPages,
					totalRecords,
					message: "Customers fetched successfully",
				});
			}
		);
	});
});

// Get shipments with filters and pagination
router.get("/shipments", (req, res) => {
	let { page, limit, carrier, status, customer_id } = req.query;

	page = parseInt(page) || 1;
	limit = parseInt(limit) || 10;
	const offset = (page - 1) * limit;

	// To ensure only numbers are used for customer_id to prevent SQL Injection
	if (customer_id && !/^\d+$/.test(customer_id)) {
		return res.status(400).json({ error: "Invalid customer ID" });
	}

	// ✅ Use a single SQL query to count total rows and fetch data
	const query = `
		SELECT SQL_CALC_FOUND_ROWS * FROM shipments 
		WHERE 1=1 
		${carrier ? "AND carrier = ?" : ""} 
		${status ? "AND status = ?" : ""} 
		${customer_id ? "AND customer_id = ?" : ""} 
		LIMIT ? OFFSET ?;
		SELECT FOUND_ROWS() as total;
	`;

	const queryParams = [];
	if (carrier) queryParams.push(carrier);
	if (status) queryParams.push(status);
	if (customer_id) queryParams.push(customer_id);
	queryParams.push(limit, offset);

	db.query(query, queryParams, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });

		const shipments = results[0];
		const totalRecords = results[1][0].total;
		const totalPages = Math.ceil(totalRecords / limit);

		res.json({
			success: true,
			shipments,
			currentPage: page,
			totalPages,
			totalRecords,
			message: "Shipments fetched successfully",
		});
	});
});

router.get("/:table/:id", (req, res) => {
	const { table, id } = req.params;
	if (!ALLOWED_TABLES.includes(table)) {
		return res.status(400).json({ error: "Invalid table access" }); // Prevent unauthorized access
	}

	db.query(`SELECT * FROM ?? WHERE id = ?`, [table, id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		if (results.length === 0)
			return res.status(404).json({ message: "Not Found" });
		res.json(results[0]);
	});
});

router.post("/:table", (req, res) => {
	const table = req.params.table;
	const data = req.body;

	db.query(`INSERT INTO ?? SET ?`, [table, data], (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "Data Inserted", id: results.insertId });
	});
});

router.put("/:table/:id", (req, res) => {
	const { table, id } = req.params;
	const data = req.body;

	db.query(
		`UPDATE ?? SET ? WHERE id = ?`,
		[table, data, id],
		(err, results) => {
			if (err) return res.status(500).json({ error: err.message });
			res.json({ message: "Data Updated", affectedRows: results.affectedRows });
		}
	);
});

router.delete("/:table/:id", (req, res) => {
	const { table, id } = req.params;

	db.query(`DELETE FROM ?? WHERE id = ?`, [table, id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "Data Deleted", affectedRows: results.affectedRows });
	});
});

module.exports = router;
