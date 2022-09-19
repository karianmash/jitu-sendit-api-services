import { Router } from "express";
import {
  create_parcel,
  delete_parcel,
  get_parcel,
  get_parcels,
  update_parcel,
} from "../controller/parcels.controller";
import { verify_token } from "../middleware/check_auth";

const router = Router();

router.post("/create_parcel", verify_token, create_parcel);
router.get("/get_parcels", verify_token, get_parcels);
router.get("/get_parcels/:parcel_id", verify_token, get_parcel);
router.patch("/update_parcel", verify_token, update_parcel);
router.delete("/delete_parcel/:parcel_id", verify_token, delete_parcel);

export default router;
