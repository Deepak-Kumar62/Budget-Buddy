import { Expense } from "../models/expenses.model.js";

export const addExpense = async (req, res, next) => {
  const userId = req.user._id;

  const { title, amount, category, description, date } = req.body;

  const parsedAmount = Number(amount);

  try {
    if (!title || !amount || !category || !description || !date) {
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

    const newExpense = await Expense.create({
      userId,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res
        .staus(404)
        .json({ success: false, message: "Expense not found" });
    }

    return res.staus(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  const { id } = req.params;

  const { title, amount, category, description, date } = req.body;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res
        .staus(404)
        .json({ success: false, message: "Expense not found" });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();

    return res.staus(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId });

    if (!expenses) {
      return res
        .status(404)
        .json({ success: false, message: "Expenses not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Expenses found successfully",
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};
