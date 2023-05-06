import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connect from "./config/db.config.mjs";
import logger from "./config/logger.config.mjs";
import mongoose from "mongoose";
import routes from "./routes/index.mjs";
import { dailyScheduleTwo } from "./util/scheduler.mjs";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let server = null;
connect()
  .then(() => {
    server = app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);

      // Connect to MongoDB
      routes(app);
      dailyScheduleTwo.start();
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT signal received: closing HTTP server");
      server.close(() => {
        logger.info("HTTP server closed");
        mongoose.connection.close(false, () => {
          logger.info("MongoDb connection closed😢");
          process.exit(0);
        });
      });
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        logger.info("HTTP server closed😢");
        mongoose.connection.close(false, () => {
          logger.info("MongoDb connection closed😢");
          process.exit(0);
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to MongoDB");
  });
