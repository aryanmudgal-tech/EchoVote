import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.route.js";
import postRoute from "./route/post.route.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((error) => console.error("Error connecting to PostgreSQL:", error));

// Sync models with the database
sequelize.sync({ alter: true });

app.use("/user", userRoute);
app.use("/post", postRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
