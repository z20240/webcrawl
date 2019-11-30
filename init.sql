CREATE DATABASE datafetcher;

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    account     VARCHAR(40) NOT NULL UNIQUE,
    password    VARCHAR(128) NOT NULL,
    name        VARCHAR(128) NOT NULL UNIQUE,
    email       VARCHAR(128) NOT NULL UNIQUE,
    authtoken   VARCHAR(255) NOT NULL DEFAULT ''
);

INSERT INTO Users (Account, Password, Name, Email) VALUES ('z20240', '7f7b0ff98dc5fdf91d8ef2744486e083', 'Les', 'aaa@aa.com');