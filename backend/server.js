import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

import { connectDB } from "./config/connectDB.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    console.log("Databse connection failed.");
  });
