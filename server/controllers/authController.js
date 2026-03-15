import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmails.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (https)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password " });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ true in prod, false in dev
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ "none" required for cross-site cookies
    });
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ add this
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // generate token
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `
You requested a password reset.

Click the link below to reset your password:

${resetUrl}

If you did not request this, ignore this email.
`;

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    message,
  });

  res.json({
    message: "Reset link sent to email",
  });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Token invalid or expired",
    });
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({
    message: "Password reset successful",
  });
};
