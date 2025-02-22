"use client";
import { Shipment } from "@/global/interfaces/Shipment";
import { getUniqueCarriers } from "@/utils/carrierHelper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShipmentTable: React.FC = () => {
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [filterCarrier, setFilterCarrier] = useState<string>("");
	const [filterByShipStatus, setFilterByShipStatus] = useState<string>("");
	const [filterCustomerId, setFilterCustomerId] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const itemsPerPage = 10; // Number of shipments per page
	const router = useRouter();

	useEffect(() => {
		const queryParams = new URLSearchParams({
			page: currentPage.toString(),
			limit: itemsPerPage.toString(),
			...(filterCarrier && { carrier: filterCarrier }), // Only add if filter exists
			...(filterByShipStatus && { status: filterByShipStatus }),
			...(filterCustomerId && { customer_id: filterCustomerId }),
		}).toString();

		fetch(`http://localhost:5000/api/shipments?${queryParams}`)
			.then((res) => res.json())
			.then((data) => {
				setShipments(Array.isArray(data.shipments) ? data.shipments : []);
				setTotalPages(data.totalPages || 1); // Ensure default page count
			})
			.catch((err) => console.error("Error loading shipments:", err));
	}, [currentPage, filterCarrier, filterByShipStatus, filterCustomerId]); // Re-fetch on filter change

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [filterCarrier, filterByShipStatus, filterCustomerId]);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">
				📦 Shipments Overview
			</h1>

			{/* Filter Section */}
			<div className="mb-4 flex gap-4">
				{/* Filter By Carrier */}
				<div>
					<label className="text-gray-700 font-semibold">
						Filter by Carrier:
					</label>
					<select
						value={filterCarrier}
						onChange={(e) => setFilterCarrier(e.target.value)}
						className="border border-gray-300 rounded px-3 py-2 ml-2"
					>
						<option value="">All Carriers</option>
						{Array.isArray(shipments) &&
							getUniqueCarriers(shipments).map((carrier) => (
								<option key={carrier} value={carrier}>
									{carrier.charAt(0).toUpperCase() +
										carrier.slice(1).toLowerCase()}
								</option>
							))}
					</select>
				</div>

				{/* Filter By Shipment Status */}
				<div>
					<label className="text-gray-700 font-semibold">
						Filter by Shipment Status:
					</label>
					<select
						value={filterByShipStatus}
						onChange={(e) => setFilterByShipStatus(e.target.value)}
						className="border border-gray-300 rounded px-3 py-2 ml-2"
					>
						<option value="">All statuses</option>
						<option value="ready_for_pickup">Ready for Pickup</option>
						<option value="picked_up">Picked Up</option>
						<option value="delayed">Delayed</option>
						<option value="in_transit">In Transit</option>
					</select>
				</div>

				{/* Filter By Customer ID */}
				<div>
					<label className="text-gray-700 font-semibold">
						Filter by Customer ID:
					</label>
					<input
						type="number"
						value={filterCustomerId}
						onChange={(e) => setFilterCustomerId(e.target.value)}
						className="border border-gray-300 rounded px-3 py-2 ml-2"
						placeholder="Enter Customer ID"
					/>
				</div>
			</div>

			{/* Table Section */}
			<div className="overflow-x-auto bg-white shadow-md rounded-lg">
				<table className="w-full border-collapse border border-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="border border-gray-300 px-4 py-2 text-left">
								No #
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Shipment ID
							</th>
							<th className="border border-gray-300 px-4 py-2">Carrier</th>
							<th className="border border-gray-300 px-4 py-2">Status</th>
							<th className="border border-gray-300 px-4 py-2">Start Time</th>
							<th className="border border-gray-300 px-4 py-2">
								Expected Delivery
							</th>
							<th className="border border-gray-300 px-4 py-2">End Time</th>
							<th className="border border-gray-300 px-4 py-2">Customer ID</th>
						</tr>
					</thead>

					<tbody>
						{shipments.length > 0 ? (
							shipments.map((shipment, index) => (
								<tr key={shipment.id} className="hover:bg-gray-50">
									<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
										{index + 1 + (currentPage - 1) * itemsPerPage}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
										{shipment.id}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										<span
											className={`px-2 py-1 text-sm font-semibold rounded-md ${
												shipment.carrier === "couriers_please"
													? "bg-red-500 text-white"
													: "text-gray-600"
											}`}
										>
											{shipment.carrier.charAt(0).toUpperCase() +
												shipment.carrier.slice(1).toLowerCase()}
										</span>
									</td>
									<td className="border border-gray-300 px-4 py-2 text-center">
										<span
											className={`px-2 py-1 text-sm font-semibold text-white rounded-md ${
												shipment.status === "picked_up"
													? "bg-green-500"
													: shipment.status === "in_transit"
													? "bg-yellow-500"
													: shipment.status === "delayed"
													? "bg-red-500"
													: "bg-blue-500"
											}`}
										>
											{shipment.status.replace("_", " ")}
										</span>
									</td>
									<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
										{shipment.start_time
											? new Date(shipment.start_time).toLocaleString()
											: "N/A"}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
										{shipment.expected_delivery
											? new Date(shipment.expected_delivery).toLocaleString()
											: "N/A"}
									</td>
									<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
										{shipment.end_time
											? new Date(shipment.end_time).toLocaleString()
											: "N/A"}
									</td>
									<td
										onClick={() =>
											router.push(`/customers/${shipment.customer_id}`)
										}
										className="border border-gray-300 px-4 py-2 text-sm text-blue-600 cursor-pointer underline"
									>
										{shipment.customer_id}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={8} className="text-center py-4 text-gray-500">
									No shipments available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-4">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					className={`px-4 py-2 border ${
						currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
					} rounded-l`}
				>
					Prev
				</button>
				<span className="px-4 py-2 border bg-white">
					Page {currentPage} of {totalPages}
				</span>
				<button
					disabled={currentPage === totalPages}
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					className={`px-4 py-2 border ${
						currentPage === totalPages
							? "bg-gray-300"
							: "bg-blue-500 text-white"
					} rounded-r`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ShipmentTable;
