import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { Doctor, Patient, Receptionist } from "../models/index.js";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const createRoleProfile = async (user) => {
  const profileBase = {
    user: user._id,
    email: user.email,
  };

  if (user.role === "doctor") {
    await Doctor.create({
      ...profileBase,
      firstName: user.username,
      lastName: "Doctor",
      specialty: "General",
    });
    return;
  }

  if (user.role === "receptionist") {
    await Receptionist.create({
      ...profileBase,
      firstName: user.username,
      lastName: "Receptionist",
    });
    return;
  }

  if (user.role === "patient") {
    await Patient.create({
      ...profileBase,
      firstName: user.username,
      lastName: "Patient",
    });
  }
};

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Request body is missing or invalid JSON" });
    }

    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    });

    try {
      await createRoleProfile(user);
    } catch (profileError) {
      await User.findByIdAndDelete(user._id);
      throw profileError;
    }

    const token = generateToken(user._id);

    // Send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    if (error?.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(400).json({
        message: `${duplicateField} already exists`,
      });
    }

    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Request body is missing or invalid JSON" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGOUT =================
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};
