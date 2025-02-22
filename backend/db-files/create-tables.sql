CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    UNIQUE(name, address, city) -- Prevents duplicate customers
);

CREATE TABLE shipments (
    id CHAR(36) PRIMARY KEY,
    carrier VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_time DATETIME NOT NULL,
    expected_delivery DATETIME NOT NULL,
    end_time DATETIME NULL,
    last_updated DATETIME NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE tracking_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipment_id CHAR(36) NOT NULL,
    event_datetime DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE
);
