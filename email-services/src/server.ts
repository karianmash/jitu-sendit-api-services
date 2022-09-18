// import express, { NextFunction, Request, Response, json } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cron from "node-cron";
dotenv.config();

import { onAssign, onComplete, onRegister } from "./services/email_service";
import ejs from "ejs";

const app = express();
app.use(cors());

//set express view engine
app.set("view engine", "ejs");

// app.get("/hello", (req, res, next) => {

// ejs.renderFile(path.join(__dirname, "welcome.ejs"),
// }

// );

app.use(express.static("public"));

function run(): void {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("running a 2 seconds schedule");
    await onRegister();
    await onAssign();
    await onComplete();
  });
}
run();

// get port number
const port: number | string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
