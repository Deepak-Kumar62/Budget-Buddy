import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/users.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authUser, logout);
router.get("/", authUser, getCurrentUser);

export default router;
