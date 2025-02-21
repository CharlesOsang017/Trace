import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

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
    const token = await generateToken(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (error) {
    console.log("error in registerUser controller", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    const comparePassword = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!existingUser || !comparePassword) {
      return res
        .status(404)
        .json({ message: "Password or email is incorrect" });
    }
    // Remove password from response
    const { password: _, ...user } = existingUser.toObject();
    const token = await generateToken(existingUser);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
