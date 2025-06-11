import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

import userRoutes from "./routes/users.routes.js";
import incomeRoutes from "./routes/incomes.routes.js";
import ecpenseRoutes from "./routes/expenses.routes.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", ecpenseRoutes);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ success: false, message: "Something went wrong." });
});
