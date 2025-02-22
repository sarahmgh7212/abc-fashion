This is a [Next.js](https://nextjs.org) project using Tailwind CSS and Node.js.

## Getting Started

First, install node modules in the frontend folder:

```bash
npm install

npm run dev
# or
yarn dev

```

To run the backend server:

```bash
npm install

node server.js

```

To setup the SQL schema, run the create-tables script to create three tables (shipments, customers, tracking_events). Then upload/run the sql files for each table to fill them with the according data. The data insertion SQL files plus the create-tables.sql can be found in the backend/db-files folder.

Open [http://localhost:3000](http://localhost:3000) with your browser to view the home page. Here you can view the list of shipments and customers in with 10 items per page. In shipments page, you can filter the shipments based on Carrier, Shipment status and Customer ID. In this way you are able to see the carriers marked as courier_please flagged and easily viewable for further action. By clicking each customer in the shipping list, you are able to see the customer details.

In a more complete solution, there should be automatic emails sent to the admin staff of Abc Fashion to update them once a shipping status is Delayed or there is a need to find a carrier, plus any urgent follow ups that are needed to be done.

More visiblity can be added to the Shipments table, by calculating how many days a shipment is delayed with the help of End time and Expected Delivery, showing a yellow/red alarm, plus adding a notification icon on the top of the page. So that the admin/staff can easily see urgend notifications.

Open [http://localhost:5000/shipments](http://localhost:5000/shipments) to see a list of all shipments.

Open [http://localhost:5000/customers](http://localhost:5000/customers) to see a list of all customers.

Open [http://localhost:5000/customers/[customerId]](http://localhost:5000/customers/[customerId]) to see a particular customer detail.
