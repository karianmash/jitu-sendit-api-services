import { Response } from "express";
import mssql from "mssql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../config/db";
import { UserLoginSchema, UserRegisterSchema } from "../helper/user_validation";
import { UserRequest } from "../interfaces/extended_requests";
import { User } from "../interfaces/user";

/*
  -----------------------------------------------------------------------------
  This a route to handle user registration
  -----------------------------------------------------------------------------
*/
export async function create_user(req: UserRequest, res: Response) {
  try {
    const pool = await mssql.connect(sqlConfig);

    const id: string = uid();

    const { error, value } = UserRegisterSchema.validate(req.body);

    if (error) {
      // Bad request
      return res.status(400).json({ error: error.details[0].message });
    }

    const hashed_password = await bcrypt.hash(value.password, 10);

    await pool
      .request()
      .input("user_id", mssql.VarChar, id)
      .input("fullname", mssql.VarChar, value.fullname)
      .input("email", mssql.VarChar, value.email)
      .input("username", mssql.VarChar, value.username)
      .input("password", mssql.VarChar, hashed_password)
      .execute("usp_CreateUser");

    res.status(201).json({
      message: "User registered successfully!",
      password: hashed_password,
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
    const pool = await mssql.connect(sqlConfig);

    const { error, value } = UserLoginSchema.validate(req.body);

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const user: User[] = (
      await pool
        .request()
        .input("email", mssql.VarChar, value.email)
        .execute("usp_GetUser")
    ).recordset;

    if (!user[0]) {
      return res.status(404).json({ message: "User not found!" });
    }

    bcrypt.compare(value.password, user[0].password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }

      if (result) {
        const payload = user.map((item) => {
          const { password, welcome_email, ...rest } = item;
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
