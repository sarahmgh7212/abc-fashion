import React from "react";
import ShipmentTable from "../components/ShipmentTable";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Abc Fashion | Shipments",
	description: "View all shipments with filters and pagination.",
};

const shipments = () => {
	return <ShipmentTable />;
};

export default shipments;
