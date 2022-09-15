// import express, { NextFunction, Request, Response, json } from "express";
import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config();

import { onAssign, onComplete, onRegister } from "./services/email_service";

const app = express();

const run = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("running a 5 seconds schedule");
    await onRegister();
    await onAssign();
    await onComplete();
  });
};
run();

// get port number
const port: number | string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
