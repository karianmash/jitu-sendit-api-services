import { Response } from "express";
import { v4 as uid } from "uuid";
import {
  ParcelCreateSchema,
  ParcelUpdateSchema,
} from "../helper/parcel_validation";
import { ParcelRequest } from "../interfaces/extended_requests";

import Connection from "../helper/db_helper";

const db = new Connection();

/*
  -----------------------------------------------------------------------------
  Controller that handles parcel creation
  -----------------------------------------------------------------------------
*/
export async function create_parcel(req: ParcelRequest, res: Response) {
  try {
    const parcel_id = uid();
    const track_id = Math.trunc(Math.random() * 10000000000).toString();

    const { error, value } = ParcelCreateSchema.validate(req.body);
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

    let in_progress_email: string,
      completed_email: string,
      canceled_email: string;

    if (status === "In Progress") {
      in_progress_email = "False";
      completed_email = "True";
      canceled_email = "True";
    }

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
      in_progress_email: in_progress_email,
      completed_email: completed_email,
      canceled_email: canceled_email,
      user_id,
    });

    res.status(201).json({ message: "Project created successful!" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

// Get all parcels
export async function get_parcels(req: ParcelRequest, res: Response) {
  try {
    const all_parcels = (await db.exec("usp_GetParcels", {})).recordset;

    res.status(200).json(all_parcels);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// Get single parcel
export async function get_parcel(req: ParcelRequest, res: Response) {
  try {
    const { parcel_id } = req.params;

    const single_parcel = (await db.exec("usp_GetParcel", { parcel_id }))
      .recordset;

    res.json(single_parcel);
  } catch (error) {
    console.log(error);
  }
}

// update parcel
export async function update_parcel(req: ParcelRequest, res: Response) {
  try {
    const { error, value } = ParcelUpdateSchema.validate(req.body);
    const {
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
      user_id,
    } = value;

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let in_progress_email: string,
      completed_email: string,
      canceled_email: string;

    switch (status) {
      case "In Progress":
        in_progress_email = "False";
        completed_email = "True";
        canceled_email = "True";
        break;

      case "Completed":
        completed_email = "False";
        in_progress_email = "True";
        canceled_email = "True";
        break;
      case "Canceled":
        canceled_email = "False";
        in_progress_email = "True";
        completed_email = "True";
        break;
    }

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
      in_progress_email: in_progress_email,
      completed_email: completed_email,
      canceled_email: canceled_email,
      user_id,
    });

    res.status(200).json({ message: "Project updated successful!" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

/*
  -----------------------------------------------------------------------------
  *Controller that hanles project assignment
  -----------------------------------------------------------------------------
*/
export async function delete_parcel(req: ParcelRequest, res: Response) {
  try {
    const { parcel_id } = req.params;

    await db.exec("usp_DeleteParcel", { parcel_id });

    res.status(200).json({ message: "Deleted parcel..." });
  } catch (error) {
    res.status(500).json({ error });
  }
}
