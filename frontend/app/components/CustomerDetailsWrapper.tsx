"use client";

import React from "react";
import { useParams } from "next/navigation";
import CustomerDetails from "./CustomerDetails";

export default function CustomerDetailsWrapper() {
	const params = useParams(); // ✅ Get params in a Client Component
	let customerId = params?.["customer-id"];

	// ✅ Ensure customerId is always a string
	if (Array.isArray(customerId)) {
		customerId = customerId[0]; // Take the first element if it's an array
	}

	return <CustomerDetails customerId={customerId || "Unknown"} />;
}
