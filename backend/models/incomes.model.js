import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

    amount: {
        type: Number,
        required: true,
        trim: true
    },

    type: {
        type: String,
        default: "income"
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
  },
  
  {
    timestamps: true,
    strict: "throw",
  }
);

export const Income = mongoose.model("Income", incomeSchema);
