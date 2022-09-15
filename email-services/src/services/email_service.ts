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
    await pool.query(`SELECT * FROM users WHERE is_sent_email='false'`)
  ).recordset;

  users.forEach((user) => {
    if (user.is_sent_email === "false") {
      let user_name = user.user_name;

      ejs.renderFile(
        `templates/registration.ejs`,
        { name: user_name },

        async (error, data) => {
          if (error) {
            console.log(error.message);

            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Welcome To Mash Software",
            html: data,
          };

          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE users SET is_sent_email='true' WHERE email = '${user.email}'`
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
export const onAssign = async () => {
  const pool = await mssql.connect(sqlConfig);
  let usersProjects = (
    await pool.query(
      `SELECT user_name, email, assigned_project, projects.title, projects.is_sent_email, projects.completion_date FROM users INNER JOIN projects ON projects.id = assigned_project;`
    )
  ).recordset;

  usersProjects.forEach((obj) => {
    if (obj.assigned_project !== null && obj.is_sent_email === "false") {
      // console.log(obj);
      return ejs.renderFile(
        `templates/assignment.ejs`,
        { name: obj.user_name, project: obj.title, date: obj.completion_date },
        async (error, data) => {
          if (error) {
            console.log(error.message);

            return;
          }

          let messageOption = {
            from: process.env.EMAIL,
            to: obj.email,
            subject: "Mash Project Assignment",
            html: data,
          };
          try {
            await sendMail(messageOption);
            await pool.query(
              `UPDATE projects SET is_sent_email='true', status = 'in progresss' WHERE id = '${obj.assigned_project}'`
            );

            console.log(
              `${obj.user_name} has been assigned a project (${obj.title})`
            );
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

  result.forEach((obj) => {
    if (obj.status === "completed" && obj.sent_complete_email === "false") {
      return ejs.renderFile(
        "templates/completion.ejs",
        { project: obj.title },
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
              `UPDATE projects SET sent_complete_email = 'true' WHERE id = '${obj.id}'`
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
