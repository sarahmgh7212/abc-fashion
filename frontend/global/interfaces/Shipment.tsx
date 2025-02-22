export interface Shipment {
	id: string;
	carrier: string;
	status: string;
	start_time: string;
	expected_delivery: string;
	end_time?: string | null;
	last_updated_date: string;
	customer_id: number;
}
