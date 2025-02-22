import { Shipment } from "@/global/interfaces/Shipment";

export function getUniqueCarriers(shipments: Shipment[]): string[] {
	if (!Array.isArray(shipments)) {
		console.error("Shipments is not an array", shipments);
		return [];
	}
	return [...new Set(shipments.map((shipment) => shipment.carrier))];
}
