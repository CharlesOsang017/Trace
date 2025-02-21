import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/token.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // checking if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // checking password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be 6 or more characters" });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const { password: _, ...user } = newUser.toObject();

    // generate JWT token
    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json(user);
  } catch (error) {
    console.log("error in registerUser controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(404)
        .json({ message: "email or password is not correct" });
    }
    generateTokenAndSetCookie(user?._id, res);

    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log("error loging in user", error.message);
  }
};

// Logout user
export const logOutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logged out successfully!" });
  } catch (error) {
    console.log("error logging out ", error.message);
  }
};
