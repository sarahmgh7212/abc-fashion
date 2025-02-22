const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "abc_fashion_db",
	port: process.env.DB_PORT || "3306",
});

db.connect((err) => {
	if (err) {
		console.error("❌ MySQL Connection Error: ", err);
		return;
	}
	console.log("✅ Connected to MySQL Database");
});

module.exports = db;
