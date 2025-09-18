import bcrypt from "bcrypt";
import db from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";
const { User } = db;

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      // attributes: { exclude: ["password"] }, // hide password
    });
    res.status(200).json({
      succss: true,
      message: "found users",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Signup new user
export const signupUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const photo = req.file ? `/images/${req.file.filename} ` : null;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role: role || "customer", // default to customer if role not provided
      photo,
    });
    const token = generateToken(user);
    user.token = token;
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//----login---
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // make sure both args exist
    if (!user.password) {
      return res.status(500).json({ message: "User password missing in DB" });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: " invalid credentials" });
    }
    console.log("password from body:", password);
    console.log("user.password from DB:", user.password);

    // save token in DB
    const token = generateToken(user);
    user.token = token;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
