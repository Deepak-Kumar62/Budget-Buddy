import { Income } from "../models/incomes.model.js";

export const addIncome = async (req, res, next) => {
  const userId = req.user._id;

  const { title, amount, category, description, date } = req.body;

  const parsedAmount = Number(amount);

  try {
    if (!title || !amount || !category || !description || !date ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be positive number",
      });
    }

    const newIncome = await Income.create({
      userId,
      title,
      amount,
      category,
      description,
      date
    });

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      data: newIncome,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteIncome = async (req, res, next) => {
  const { id } = req.params;

  try {
    const income = await Income.findByIdAndDelete(id);

    if (!income) {
      return res
        .staus(404)
        .json({ success: false, message: "Income not found" });
    }

    return res.staus(200).json({
      success: true,
      message: "Income deleted successfully",
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

export const updateIncome = async (req, res, next) => {
  const { id } = req.params;

  const { title, amount, category, description, date } = req.body;

  try {
    const income = await Income.findById(id);

    if (!income) {
      return res
        .staus(404)
        .json({ success: false, message: "Income not found" });
    }

    income.title = title || income.title;
    income.amount = amount || income.amount;
    income.category = category || income.category;
    income.description = description || income.description;
    income.date = date || income.date;

    await income.save();

    return res.staus(200).json({
      success: true,
      message: "Income updated successfully",
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

export const getIncome = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId });

    if (!incomes) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Income found successfully",
      data: incomes,
    });
  } catch (error) {
    next(error);
  }
};
