import express from "express";

import { authUser } from "../middlewares/auth.middleware.js";
import { addIncome, deleteIncome, getIncome, updateIncome } from "../controllers/incomes.controller.js";

const router = express.Router();

router.get("/", authUser, getIncome);
router.post("/", authUser, addIncome);
router.put("/:id", authUser, updateIncome);
router.delete("/:id", authUser, deleteIncome);


export default router;
