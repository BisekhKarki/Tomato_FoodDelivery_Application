import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      message: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    // Checking is user already exist
    if (exist) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validating email format & string password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please eneter a string password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      message: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

export { loginUser, registerUser };
