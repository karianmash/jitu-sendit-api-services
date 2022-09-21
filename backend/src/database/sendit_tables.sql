-- CREATE DATABASE SendIt;
-- USE [SendIt];


-- CREATE TABLE users
-- (
--     user_id VARCHAR(100) PRIMARY KEY NOT NULL,
--     user_role VARCHAR(20) DEFAULT 'user',
--     fullname VARCHAR (55) NOT NULL,
--     email VARCHAR (50) NOT NULL,
--     username VARCHAR(20) NOT NULL,
--     hashed_password VARCHAR(100) NOT NULL,
--     welcome_email VARCHAR (10) NOT NULL DEFAULT 'False'
-- );

-- CREATE TABLE parcels
-- (
--     parcel_id VARCHAR(100) PRIMARY KEY NOT NULL,
--     track_id VARCHAR (100) NOT NULL,
--     shipper VARCHAR (50) NOT NULL,
--     weight VARCHAR (10) NOT NULL,
--     status VARCHAR(20) NOT NULL DEFAULT 'In Progress',
--     created_at DATETIME DEFAULT GETDATE(),
--     sender VARCHAR (50) NOT NULL,
--     receiver VARCHAR (50) NOT NULL,
--     item_name VARCHAR (50) NOT NULL,
--     price VARCHAR (50) NOT NULL,
--     origin_location VARCHAR (100) NOT NULL,
--     pick_up_location VARCHAR (100) NOT NULL,
--     in_progress_email VARCHAR (10) NOT NULL DEFAULT 'True',
--     completed_email VARCHAR (10) NOT NULL DEFAULT 'True',
--     canceled_email VARCHAR (10) NOT NULL DEFAULT 'True',
--     is_deleted VARCHAR (10) NOT NULL DEFAULT 'False',
--     user_id VARCHAR(100) NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
-- );

-- DROP TABLE parcels;
-- DROP TABLE users;