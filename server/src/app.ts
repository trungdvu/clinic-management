// IMPORT
import express, { Application } from "express";
import logger from "morgan";
import cors from "cors";
import { models } from "./api/models";
import apiRouters from "./api/routers";

const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(logger("dev"));

const apiVersion = "v1.0.0";

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