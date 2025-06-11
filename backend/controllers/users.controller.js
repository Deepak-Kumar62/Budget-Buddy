import { User } from "../models/users.model.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = user.generateJWT(); // ✅ Fixed here

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "None", // Required for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is invalid" });
    }

    const isMatched = await existingUser.matchPassword(password);

    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is invalid" });
    }

    const token = existingUser.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "None", // Required for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: 7 days
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser._id,
        username: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    if (error.code === 121) {
      return res.status(400).json({
        success: false,
        message: "Invalid input, please enter valid details",
      });
    } else {
      next(error);
    }
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User successfully found",
    user: req.user,
  });
};
