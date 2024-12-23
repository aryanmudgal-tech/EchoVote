import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./route/user.route.js";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = 4000;
const URI =
  "mongodb+srv://echovote:ayusharyan@cluster0.k81n1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

//Defining routes
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`EchoVote listening on port ${PORT}`);
});
