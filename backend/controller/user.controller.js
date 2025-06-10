import dotenv from 'dotenv';
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";



const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS  // set in .env
  }
});

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.endsWith('buffalo.edu')) {
      return res.status(400).json({ message: "Only buffalo.edu email addresses are allowed" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    const newUser = await User.create({ email, password: hashPassword, otp, otpExpiresAt, isVerified: false });

    // Send OTP email
    await transporter.sendMail({
      to: email,
      subject: 'Your EchoVote OTP Code',
      text: `Thank you for signing up for EchoVote! Your OTP is: ${otp}`
    });

    res.status(201).json({ message: "OTP sent to your email. Please check spam and verify to complete registration." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      user: { 
        id: user.id, 
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
