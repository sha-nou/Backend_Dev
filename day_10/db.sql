CREATE DATABASE newDB;

CREATE TABLE user(
    id int,
    orderId int,
    productId int,
    quantity int,
    FOREIGN KEY (orderId) REFERENCES order(orderId),
    FOREIGN KEY (productId) REFERENCES product(id)
)

CREATE TABLE order(
    orderId int PRIMARY KEY,
    orderDate DATE,
    totalPrice DECIMAL(10, 2)
)

CREATE TABLE product(
    id int PRIMARY KEY,
    name varchar(255),
    category varchar(255),
    price DECIMAL(10, 2)
)

CREATE TABLE category(
    id int PRIMARY KEY,
    name varchar(255)
)