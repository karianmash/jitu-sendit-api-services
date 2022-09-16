import { Response } from "express";
import { v4 as uid } from "uuid";
import { ParcelSchema } from "../helper/parcel_validation";
import { ParcelRequest } from "../interfaces/extended_requests";

import Connection from "../helper/db_helper";

const db = new Connection();

/*
  -----------------------------------------------------------------------------
  Controller that hanles parcel creation
  -----------------------------------------------------------------------------
*/
export async function create_parcel(req: ParcelRequest, res: Response) {
  try {
    const parcel_id = uid();
    const track_id = Math.trunc(Math.random() * 10000000000).toString();

    const { error, value } = ParcelSchema.validate(req.body);
    const {
      shipper,
      status,
      sender,
      receiver,
      item_name,
      price,
      origin_location,
      pick_up_location,
      user_id,
    } = value;

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    console.log(value);

    await db.exec("usp_CreateUpdateParcel", {
      parcel_id,
      track_id,
      shipper,
      status,
      sender,
      receiver,
      item_name,
      price,
      origin_location,
      pick_up_location,
      in_progress_email: 0,
      completed_email: 0,
      canceled_email: 0,
      user_id,
    });

    res.status(201).json({ message: "Project created successful!" });
  } catch (error) {
    res.json({ error });
  }
}

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
