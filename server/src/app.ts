// IMPORT
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import { models } from "./api/models";
import apiRouters from "./api/routers";
import { signIn } from "./api/controllers/identity.controller";

const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(logger("dev"));

const apiVersion = "v1.0.0";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!!!");
});

console.log("api router", apiRouters);
app.use(`/${apiVersion}`, apiRouters);

// Sync
app.listen(port, async () => {
  try {
    await models.sequelize.sync();
    console.log("Database sync");
    console.log("Server running ..");
  } catch (error) {
    console.log("Error: ", error);
  }
});
