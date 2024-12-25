export default User;

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: createdUser.name,
        email: createdUser.email,
        _id: createdUser._id,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password " });
    } else {
      return res.status(200).json({
        message: "Login Successful ",
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    }
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
