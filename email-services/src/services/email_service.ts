import ejs from "ejs";
import dotenv from "dotenv";
import mssql from "mssql";
dotenv.config();
import sendMail from "../helpers/email";
import { sqlConfig } from "../config/db";

// Send email on user registration
export const user_registration = async () => {
  const pool = await mssql.connect(sqlConfig);
  let users = (
    await pool.query(`SELECT * FROM users WHERE welcome_email='False'`)
  ).recordset;

  users.forEach((user) => {
    if (user.welcome_email === "False") {
      let name = user.fullname;
      ejs.renderFile(
        `views/welcome.ejs`,
        { name: name },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Welcome To SENDiT",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE users SET welcome_email='True' WHERE email = '${user.email}'`
            );
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
    return;
  });
};

// Send email on parcel creation
export const parcel_created = async () => {
  const pool = await mssql.connect(sqlConfig);
  let parcels = (
    await pool.query(
      `SELECT parcel_id, status, in_progress_email, sender, receiver, item_name FROM parcels;`
    )
  ).recordset;

  parcels.forEach((user_parcel) => {
    if (
      user_parcel.status === "In Progress" &&
      user_parcel.in_progress_email === "False"
    ) {
      ejs.renderFile(
        "views/sent/sender_sent.ejs",
        {
          receiver: user_parcel.receiver,
          sender: user_parcel.sender,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.sender,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE parcels SET in_progress_email='True' WHERE parcel_id = '${user_parcel.parcel_id}'`
            );
          } catch (error) {
            console.log(error);
          }
        }
      );

      // mail to receiver
      ejs.renderFile(
        `views/sent/receiver_sent.ejs`,
        {
          receiver: user_parcel.receiver,
          sender: user_parcel.sender,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.receiver,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};

// Send email on parcel delivery
export const parcel_delivered = async () => {
  const pool = await mssql.connect(sqlConfig);
  let parcels = (
    await pool.query(
      `SELECT parcel_id, status, completed_email, sender, receiver, item_name FROM parcels;`
    )
  ).recordset;

  parcels.forEach((user_parcel) => {
    if (
      user_parcel.status === "Completed" &&
      user_parcel.completed_email === "False"
    ) {
      ejs.renderFile(
        "views/completed/sender_completed.ejs",
        {
          sender: user_parcel.sender,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.sender,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE parcels SET completed_email='True' WHERE parcel_id = '${user_parcel.parcel_id}'`
            );
          } catch (error) {
            console.log(error);
          }
        }
      );

      // mail to receiver
      ejs.renderFile(
        `views/completed/receiver_completed.ejs`,
        {
          receiver: user_parcel.receiver,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.receiver,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};

// Send email on parcel delivery
export const parcel_canceled = async () => {
  const pool = await mssql.connect(sqlConfig);
  let parcels = (
    await pool.query(
      `SELECT parcel_id, status, canceled_email, sender, receiver, item_name FROM parcels;`
    )
  ).recordset;

  parcels.forEach((user_parcel) => {
    if (
      user_parcel.status === "Completed" &&
      user_parcel.canceled_email === "False"
    ) {
      ejs.renderFile(
        "views/canceled/sender_canceled.ejs",
        {
          sender: user_parcel.sender,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.sender,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE parcels SET canceled_email='True' WHERE parcel_id = '${user_parcel.parcel_id}'`
            );
          } catch (error) {
            console.log(error);
          }
        }
      );

      // mail to receiver
      ejs.renderFile(
        `views/canceled/receiver_canceled.ejs`,
        {
          receiver: user_parcel.receiver,
          item_name: user_parcel.item_name,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }
          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.receiver,
            subject: "Parcel Sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};
