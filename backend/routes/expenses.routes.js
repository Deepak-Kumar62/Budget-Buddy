import express from "express";

import { authUser } from "../middlewares/auth.middleware.js";

import { addExpense, deleteExpense, getExpense, updateExpense } from "../controllers/expenses.controller.js";

const router = express.Router();

router.get("/", authUser, getExpense);
router.post("/", authUser, addExpense);
router.put("/:id", authUser, updateExpense);
router.delete("/:id", authUser, deleteExpense);


export default router;
