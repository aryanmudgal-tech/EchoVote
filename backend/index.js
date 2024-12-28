import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto";
import userRoute from "./route/user.route.js";
import postRoute from "./route/post.route.js";
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000", //frontend's URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const otpStore = {};

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint to send OTP
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email.endsWith("@buffalo.edu")) {
    return res.status(400).json({ message: "Invalid email domain." });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = { otp, expires: Date.now() + 300000 }; // 5 minutes expiry

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending OTP." });
  }
});

// Endpoint to verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) {
    return res
      .status(400)
      .json({ message: "No OTP requested for this email." });
  }

  if (record.expires < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  delete otpStore[email];
  res.json({ message: "OTP verified." });
});

// Use User Routes
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(PORT, () => {
  console.log(`EchoVote listening on port ${PORT}`);
});
