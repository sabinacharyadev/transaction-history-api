import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import {
  createTransaction,
  deleteTransactions,
  getUserTransactions,
} from "../model/transactionModel.js";
import { findUserById } from "../model/userModel.js";

const transactionRouter = express.Router();

// POST | Create a transaction
transactionRouter.post("/", async (req, res) => {
  try {
    const { authorization } = req.headers;

    const user = await findUserById(authorization);
    if (!user._id) {
      buildErrorResponse(res, "You are not authorized user!");
      return;
    }

    const transaction = await createTransaction(req.body);

    transaction?._id
      ? buildSuccessResponse(
          res,
          transaction,
          "Created Transaction Successfully"
        )
      : buildErrorResponse(res, "Cannot create transaction!");
  } catch (error) {
    buildErrorResponse(res, "Cannot create transaction!");
  }
});

// INDEX | Get transactions
transactionRouter.get("/", async (req, res) => {
  try {
    // check if user if authorized
    const { authorization } = req.headers;

    const user = await findUserById(authorization);
    if (!user._id) {
      buildErrorResponse(res, "You are not authorized user!");
      return;
    }
    const transactions = await getUserTransactions(user._id);

    transactions.length
      ? buildSuccessResponse(res, transactions, "Created fetched Successfully")
      : buildErrorResponse(res, "Cannot fetch transaction!");
  } catch (error) {
    buildErrorResponse(res, "Cannot fetch transaction!");
  }
});

// DELETE | Delete Transactions
transactionRouter.delete("/", async (req, res) => {
  try {
    const { authorization } = req.headers;

    const user = await findUserById(authorization);

    if (!user._id) {
      return buildErrorResponse(res, "You are not authorized user");
    }
    const response = await deleteTransactions(req.body);
    response?.acknowledged
      ? buildSuccessResponse(
          res,
          response,
          "Transaction(s) successfully deleted"
        )
      : buildErrorResponse(res, "Cannot delete transaction!");
  } catch (error) {
    buildErrorResponse(res, "Something went wrong");
  }
});

export default transactionRouter;
