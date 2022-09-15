import { Router } from "express";
import { create_user, login_user } from "../controller/users.controller";

const router = Router();

router.post("/register", create_user);
router.post("/login", login_user);
// router.get("/getUserProject/:userEmail", getUserProject);

export default router;
