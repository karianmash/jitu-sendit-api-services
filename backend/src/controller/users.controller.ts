import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uid } from "uuid";
import { UserLoginSchema, UserRegisterSchema } from "../helper/user_validation";
import { UserRequest } from "../interfaces/extended_requests";
import { User } from "../interfaces/user";

import Connection from "../helper/db_helper";

const db = new Connection();

/*
  -----------------------------------------------------------------------------
  This a route to handle user registration
  -----------------------------------------------------------------------------
*/
export async function create_user(req: UserRequest, res: Response) {
  try {
    const user_id: string = uid();
    const { error, value } = UserRegisterSchema.validate(req.body);
    const { fullname, email, username, password } = value;

    if (error) {
      // Bad request
      return res.status(400).json({ error: error.details[0].message });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await db.exec("usp_CreateUser", {
      user_id,
      fullname,
      email,
      username,
      hashed_password,
    });

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

/*
  -----------------------------------------------------------------------------
  This a route to handle user login
  -----------------------------------------------------------------------------
*/
export async function login_user(req: UserRequest, res: Response) {
  try {
    const { error, value } = UserLoginSchema.validate(req.body);
    const { email, password } = value;

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const user: User[] = (await db.exec("usp_GetUser", { email })).recordset;

    if (!user[0]) {
      return res.status(404).json({});
    }

    bcrypt.compare(password, user[0].hashed_password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }

      if (result) {
        const payload = user.map((item) => {
          const { hashed_password, welcome_email, ...rest } = item;
          return rest;
        });

        const token = jwt.sign(payload[0], process.env.JWT_KEY as string, {
          expiresIn: "1h",
        });

        res.status(200).json({
          message: "Auth successful!",
          user: payload[0],
          token,
        });
      } else {
        // Anauthorized
        res.status(401).json({
          message: "Authorization failed!",
          password: user[0].password,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function get_users(req: UserRequest, res: Response) {
  try {
    const all_users = (await db.exec("usp_GetUsers", {})).recordset;

    res.status(200).json(all_users);
  } catch (error) {
    res.status(500).json({ error });
  }
}
