import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { AuthRequest } from "../interfaces/extended_requests";
import { JWT_Data } from "../interfaces/jwt";

dotenv.config();

export const verify_token = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1] as string;

    if (!token) {
      return res
        .status(401)
        .json({ message: "You don't have permissions to access this route" });
    }

    const data = jwt.verify(token, process.env.JWT_KEY as string) as JWT_Data;
    req.info = data;
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed!",
    });
  }

  next();
};
