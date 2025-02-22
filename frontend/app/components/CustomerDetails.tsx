"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Customer } from "@/global/interfaces/Customer";

const CustomerDetails = ({ customerId }: { customerId: string }) => {
	const params = useParams();
	const id = params["customer-id"];
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!customerId) return;
		fetch(`http://localhost:5000/api/customers/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setCustomer(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching customer:", err);
				setLoading(false);
			});
	}, [id]);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">
				👤 Customer Details
			</h1>

			{loading ? (
				<p className="text-center text-gray-600">Loading customer details...</p>
			) : customer ? (
				<div className="overflow-x-auto bg-white shadow-md rounded-lg">
					<table className="w-full border-collapse border border-gray-200">
						<tbody>
							<tr>
								<td className="border px-4 py-2 font-semibold">ID:</td>
								<td className="border px-4 py-2">{customer.id}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">Name:</td>
								<td className="border px-4 py-2">{customer.name}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">Address:</td>
								<td className="border px-4 py-2">{customer.address}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">City:</td>
								<td className="border px-4 py-2">{customer.city}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">Country:</td>
								<td className="border px-4 py-2">{customer.country}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">Latitude:</td>
								<td className="border px-4 py-2">{customer.latitude}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2 font-semibold">Longitude:</td>
								<td className="border px-4 py-2">{customer.longitude}</td>
							</tr>
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-center text-red-500">Customer not found</p>
			)}
		</div>
	);
};

export default CustomerDetails;
