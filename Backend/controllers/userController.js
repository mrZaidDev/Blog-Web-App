import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const RegisterController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required." });
  }
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "user already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({ username, email, password: hashedPassword });
    return res.status(201).json({ message: "user registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required." });
  }
  try {
    const existing = await userModel.findOne({ email });
    if (!existing) {
      return res.status(404).json({ message: "user not registered." });
    }

    const isPasswordTrue = await bcrypt.compare(password, existing.password);
    if (!isPasswordTrue) {
      return res.status(400).json({ message: "password is incorrect." });
    }
    // JWT Token Setup
    const token = jwt.sign(
      { id: existing._id, email },
      'zaidkhanchamanwala',
      { expiresIn: "1h" }
    );
    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    // success response
    return res.status(200).json(existing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LogoutController = async (req, res) => {
  res.clearCookie("Token", {
    sameSite: "Strict",
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({ message: "user logged out successfully." });
};

export const IsAuthenticated = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.user.id);
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).json({message:"Internal server error!"})
  }
};
