import React from "react";
import CustomerDetailsWrapper from "@/app/components/CustomerDetailsWrapper";

export default function CustomerDetailsPage() {
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold">Customer Details</h1>
			<p>More details about the customer:</p>

			<CustomerDetailsWrapper />
		</div>
	);
}
