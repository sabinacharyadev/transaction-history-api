import "dotenv/config";
import express from "express";
import userRouter from "./src/router/userRouter.js";
import transactionRouter from "./src/router/transactionRouter.js";
import { connectToMongoDB } from "./src/config/dbConfig.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.json());

const corsOption = {
  credential: true,
  origin: true,
};

app.use(cors(corsOption));

app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server Running Successfully`);
});
