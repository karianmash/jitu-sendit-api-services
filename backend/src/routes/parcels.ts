import { Router } from "express";
import { create_parcel } from "../controller/parcels.controller";

const router = Router();

router.post("/create", create_parcel);
// router.get("/getProjects", getProjects);
// router.post("/deleteProject", deleteProject);

export default router;
