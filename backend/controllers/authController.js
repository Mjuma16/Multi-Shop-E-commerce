import User from "../models/authSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password, 8);
    const r = await User.create(newUser);
    res.json({
      user: r,
      success: true,
      message: "User has been registered successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return next(new Error("Please Provide the login Details"));
    }
    if (!email) {
      return next(new Error("Please Provide your email"));
    }
    if (!password) {
      return next(new Error("Please Provide your password"));
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new Error("Incorrect email! please try again"));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new Error("Invalid password, Please try again"));
    }
    //JWT
    const token = jwt.sign({ payload: user }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });

    req.token = token;

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
        secure: true,
        SameSite: "None",
      })
      .status(200)
      .json({
        user,
        token,
        success: true,
        message: "User Login Successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }).json({
    message: "User Logout",
  });
};
