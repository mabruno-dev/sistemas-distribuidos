CREATE DATABASE SD;



CREATE TABLE products (
    id SERIAL PRIMARY KEY,        
    name VARCHAR(255) NOT NULL,   
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,             
    image TEXT                    
);

INSERT INTO products (name, price, description, image) VALUES
('Item 1', 50, 'teste', 'teste');