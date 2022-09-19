import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import user_routes from "./routes/users";
import parcel_routes from "./routes/parcels";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.json("Welcome to SENDiT Courier");
});
app.use("/api/users", user_routes);
app.use("/api/parcels", parcel_routes);

// Handle requests that cross past the above request handlers
app.get("*", (_req: Request, res: Response): void => {
  res.status(404).json("Invalid URL!!!");
});

// get port number
const port: number | string = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
