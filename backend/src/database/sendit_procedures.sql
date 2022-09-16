-- UPDATE users set user_role = 'admin' where email = 'ianmachariak17@gmail.com';

-- EXECUTE usp_CreateUser 'dfb54dfd25f45dfsv45sdv4sd5vsd54', 'Ian Macharia', 'ianmachariak17@gmail.com', 'karianmash', '123';
-- Create user
-- CREATE PROCEDURE usp_CreateUser
--     (
--     @user_id VARCHAR(100),
--     @fullname VARCHAR (55),
--     @email VARCHAR (50),
--     @username VARCHAR(20),
--     @password VARCHAR(100)
-- )
-- AS
-- BEGIN
--     INSERT INTO users
--         (
--         user_id,
--         fullname,
--         email,
--         username,
--         password
--         )
--     VALUES
--         (
--             @user_id,
--             @fullname,
--             @email,
--             @username,
--             @password
--     );
-- END;





-- EXECUTE usp_GetUser 'ianmachariak17@gmail.com';


-- Procedure to get users
-- CREATE PROCEDURE usp_GetUser(@email VARCHAR(50))
-- AS
-- BEGIN
--     SELECT * FROM users WHERE email = @email;
-- END





-- EXECUTE usp_GetUsers;
-- Procedure to get all users
-- CREATE PROCEDURE usp_GetUsers
-- AS
-- BEGIN
--     SELECT user_id, user_role, fullname, email, username, welcome_email FROM users WHERE user_role = 'user';
-- END


-- Create/update a parcel
-- CREATE PROCEDURE usp_CreateUpdateParcel
--     (
--     @parcel_id VARCHAR(100),
--     @track_id VARCHAR (50),
--     @shipper VARCHAR (50),
--     @status VARCHAR(20),
--     @updated_at DATETIME,
--     @sender VARCHAR(100),
--     @receiver VARCHAR (55),
--     @item_name VARCHAR (50),
--     @price VARCHAR (50),
--     @origin_location VARCHAR(20),
--     @pick_up_location VARCHAR(100),
--     @in_progress_email BIT,
--     @completed_email BIT,
--     @canceled_email BIT,
--     @user_id VARCHAR(100)
-- )
-- AS
-- BEGIN
--     IF EXISTS (SELECT 1
--     FROM parcels
--     WHERE parcel_id = @parcel_id)

--     BEGIN
--         UPDATE parcels SET
--             parcel_id = @parcel_id,
--             track_id = @track_id,
--             shipper = @shipper,
--             status = @status,
--             updated_at = @updated_at,
--             sender = @sender,
--             receiver = @receiver,
--             item_name = @item_name,
--             price = @price,
--             origin_location = @origin_location,
--             pick_up_location = @pick_up_location,
--             in_progress_email = @in_progress_email,
--             completed_email = @completed_email,
--             canceled_email = @canceled_email,
--             user_id = @user_id
--         WHERE parcel_id = @parcel_id
--         PRINT 'Parcel updated successfully...'
--     END

--     ELSE 
--         BEGIN
--         INSERT INTO parcels
--             (
--             parcel_id,
--             track_id,
--             shipper,
--             status,
--             updated_at,
--             sender,
--             receiver,
--             item_name,
--             price,
--             origin_location,
--             pick_up_location,
--             in_progress_email,
--             completed_email,
--             canceled_email,
--             user_id
--             )
--         VALUES
--             (
--                 @parcel_id,
--                 @track_id,
--                 @shipper,
--                 @status,
--                 @updated_at,
--                 @sender,
--                 @receiver,
--                 @item_name,
--                 @price,
--                 @origin_location,
--                 @pick_up_location,
--                 @in_progress_email,
--                 @completed_email,
--                 @canceled_email,
--                 @user_id
--             )
--         PRINT 'Parcel created successfully...'
--     END
-- END;