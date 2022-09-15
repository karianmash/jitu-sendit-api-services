// import { Response } from "express";
// import mssql from "mssql";
// import { v4 as uid } from "uuid";
// import { sqlConfig } from "../Config/db";
// import { ProjectSchema } from "../Helper/ProjectValidation";
// import { ProjectRequest } from "../Interfaces/ExtendedRequest";

// /*
//   -----------------------------------------------------------------------------
//   *Controller that hanles project creation
//   -----------------------------------------------------------------------------
// */
// export async function createProject(req: ProjectRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);

//     const id = uid();

//     const { error, value } = ProjectSchema.validate(req.body);
//     if (error) {
//       return res.json({ error: error.details[0].message });
//     }

//     await pool
//       .request()
//       .input("id", mssql.VarChar, id)
//       .input("title", mssql.VarChar, value.title)
//       .input("description", mssql.VarChar, value.description)
//       .input("completion_date", mssql.VarChar, value.completion_date)
//       .execute("createProject");

//     res.status(201).json({ message: "Project created successful!" });
//   } catch (error) {
//     res.json({ error });
//   }
// }

// // Get all projects
// export async function getProjects(req: ProjectRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);
//     const allprojects = (await pool.request().execute("getAllProjects"))
//       .recordset;

//     // console.log(allprojects);
//     console.log(allprojects);

//     res.json(allprojects);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // GetSingleProject
// // Get all projects
// // export async function get(req: ProjectRequest, res: Response) {
// //   try {
// //     const pool = await mssql.connect(sqlConfig);
// //     const allprojects = (await pool.request().execute("getAllProjects"))
// //       .recordset;

// //     // console.log(allprojects);
// //     console.log(allprojects);

// //     res.json(allprojects);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// // assign project
// export async function assignProject(req: ProjectRequest, res: Response) {
//   try {
//     const pool = await mssql.connect(sqlConfig);
//     const allprojects = (await pool.request().execute("getAllProjects"))
//       .recordset;
//     console.log(allprojects);

//     res.json(allprojects);
//   } catch (error) {
//     console.log(error);
//   }
// }

// /*
//   -----------------------------------------------------------------------------
//   *Controller that hanles project assignment
//   -----------------------------------------------------------------------------
// */
// // export async function deleteProject(req: ProjectRequest, res: Response) {
// //   try {
// //     const pool = await mssql.connect(sqlConfig);
// //     // const { project_id } = req.body;

// //     await pool
// //       .request()
// //       .input("project_id", mssql.VarChar, project_id)
// //       .execute("deleteProject");

// //     res.json({ message: "Deleted project..." });
// //   } catch (error) {
// //     res.json({ error });
// //   }
// // }
