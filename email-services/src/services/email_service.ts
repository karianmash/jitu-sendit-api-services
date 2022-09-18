import ejs from "ejs";
import dotenv from "dotenv";
import mssql from "mssql";
dotenv.config();
import sendMail from "../helpers/email";
import { sqlConfig } from "../config/db";

// Send email on user registration
export const onRegister = async () => {
  const pool = await mssql.connect(sqlConfig);
  let users = (
    await pool.query(`SELECT * FROM users WHERE welcome_email='False'`)
  ).recordset;

  users.forEach((user) => {
    if (user.welcome_email === "False") {
      let user_name = user.fullname;

      ejs.renderFile(
        `templates/welcome.ejs`,
        { name: user_name },

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

            console.log(`Email has been sent to ${user.user_name}`);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
    return;
  });
};

// Send email on project assignment
export const onParcelCreated = async () => {
  const pool = await mssql.connect(sqlConfig);
  let usersProjects = (
    await pool.query(
      `SELECT users.user_id, fullname, parcel_id, parcels.user_id, status, in_progress_email, completed_email, canceled_email, sender, receiver, item_name FROM users INNER JOIN parcels ON users.user_id = parcels.user_id;`
    )
  ).recordset;

  usersProjects.forEach((user_parcel) => {
    if (
      user_parcel.status === "In Progress" &&
      user_parcel.in_progress_email === "False"
    ) {
      // console.log(user);
      return ejs.renderFile(
        `templates/assignment.ejs`,
        {
          name: user_parcel.receiver,
          parcel: user_parcel.item_name,
          sender: user_parcel.sender,
        },
        async (error, data) => {
          if (error) {
            console.log(error.message);
            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: user_parcel.sender,
            subject: "Your parcel has been sent!",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE parcels SET in_progress_email='True' WHERE parcel_id = '${user_parcel.parcel_id}'`
            );

            console.log(`A parcel from ${user_parcel.sender} has been sent`);
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};

// Send email on project completion
export const onComplete = async () => {
  const pool = await mssql.connect(sqlConfig);
  let result = (
    await pool.query(
      `SELECT id, title, status, sent_complete_email FROM projects WHERE status = 'completed'`
    )
  ).recordset;

  result.forEach((user) => {
    if (user.status === "completed" && user.sent_complete_email === "false") {
      return ejs.renderFile(
        "templates/completion.ejs",
        { project: user.title },
        async (error, data) => {
          if (error) {
            console.log(error.message);

            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: "ianmachariak17@gmail.com",
            subject: "Project Completion",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE projects SET sent_complete_email = 'true' WHERE id = '${user.id}'`
            );

            console.log("Email is Sent");
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  });
};
