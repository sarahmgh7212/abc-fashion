"use client";
import { Customer } from "@/global/interfaces/Customer";
import React, { useEffect, useState } from "react";

const CustomersTable: React.FC = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const itemsPerPage = 10; // Customers per page

	// Fetch paginated customers
	useEffect(() => {
		fetch(
			`http://localhost:5000/api/customers?page=${currentPage}&limit=${itemsPerPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				setCustomers(Array.isArray(data.customers) ? data.customers : []);
				setTotalPages(data.totalPages || 1); // Ensure default page count
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching customers:", err);
				setLoading(false);
			});
	}, [currentPage]);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">
				👥 Customers List
			</h1>
			<h2 className="mb-4"> Showing 10 customer per page</h2>
			{loading ? (
				<p className="text-center text-gray-600">Loading customers...</p>
			) : (
				<>
					<div className="overflow-x-auto bg-white shadow-md rounded-lg">
						<table className="w-full border-collapse border border-gray-200">
							<thead className="bg-gray-100">
								<tr>
									<th className="border border-gray-300 px-4 py-2 text-left">
										ID
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										Name
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										Address
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										City
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										Country
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										Latitude
									</th>
									<th className="border border-gray-300 px-4 py-2 text-left">
										Longitude
									</th>
								</tr>
							</thead>
							<tbody>
								{customers.length > 0 ? (
									customers.map((customer) => (
										<tr key={customer.id} className="hover:bg-gray-50">
											<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
												{customer.id}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
												{customer.name}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{customer.address}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{customer.city}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{customer.country}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{customer.latitude}
											</td>
											<td className="border border-gray-300 px-4 py-2">
												{customer.longitude}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={7} className="text-center py-4 text-gray-500">
											No customers available.
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
				</>
			)}
		</div>
	);
};

export default CustomersTable;
