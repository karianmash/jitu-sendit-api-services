CREATE DATABASE SendIt;
USE [SendIt];


CREATE TABLE users
(
    user_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_role VARCHAR(20) DEFAULT 'user',
    fullname VARCHAR (55) NOT NULL,
    email VARCHAR (50) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    welcome_email BIT NOT NULL DEFAULT 0
);

CREATE TABLE parcels
(
    parcel_id VARCHAR(100) PRIMARY KEY NOT NULL,
    track_id VARCHAR (100) NOT NULL,
    shipper VARCHAR (50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'In Progress',
    created_at DATETIME,
    sender VARCHAR (50) NOT NULL,
    receiver VARCHAR (50) NOT NULL,
    item_name VARCHAR (50) NOT NULL,
    origin_location VARCHAR (100) NOT NULL,
    pick_up_location VARCHAR (100) NOT NULL,
    in_progress_email BIT NOT NULL DEFAULT 0,
    completed_email BIT NOT NULL DEFAULT 0,
    canceled_email BIT NOT NULL DEFAULT 0,
    user_id VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
