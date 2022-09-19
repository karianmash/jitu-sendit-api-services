import { Router } from "express";
import {
  create_user,
  get_users,
  login_user,
} from "../controller/users.controller";
import { verify_token } from "../middleware/check_auth";

const router = Router();

router.post("/register_user", create_user);
router.post("/login_user", login_user);
router.get("/get_users", verify_token, get_users);

export default router;
