import db from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";
const { User } = db;

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // hide password
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
