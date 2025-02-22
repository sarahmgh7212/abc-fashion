import React from "react";
import CustomersTable from "../components/CustomersTable";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Abc Fashion | Customers",
	description: "View all customers with their details",
};

const customers = () => {
	return <CustomersTable />;
};

export default customers;
