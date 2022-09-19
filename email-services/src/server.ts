import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config();

import {
  parcel_created,
  user_registration,
  parcel_delivered,
  parcel_canceled,
} from "./services/email_service";

const app = express();

function run(): void {
  cron.schedule("*/3 * * * * *", async () => {
    console.log("Running a 3 second schedule in the background");
    await user_registration();
    await parcel_created();
    await parcel_delivered();
    await parcel_canceled();
  });
}
run();

// get port number
const port: number | string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
