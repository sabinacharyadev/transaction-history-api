import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../model/userModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
const userRouter = express.Router();

// CREATE | POST
userRouter.post("/signup", async (req, res) => {
  try {
    // Sign up process
    const { name, email, password } = req.body;
    // encrypt the password -> hashing the password
    const hashedPassword = hashPassword(password);

    // Create user in db
    const user = await createUser({
      name: name,
      email: email,
      password: hashedPassword,
    });
    user?._id
      ? buildSuccessResponse(res, user, "User created successfully")
      : buildErrorResponse(res, "Could not create user");
  } catch (error) {
    // handle unique email error from db
    if (error.code === 11000) {
      buildErrorResponse(res, "User with this email address already exists!");
    }
  }
});

// POST | User login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1 . find user in db
    const user = await findUserByEmail(email);

    //2 . if user not found return back
    if (!user?._id) {
      return buildErrorResponse(res, "Invalid credentials");
    }

    //3 . if user found in db.
    const isPasswordMatched = comparePassword(password, user.password);
    // make user password null, so not send back to client
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    isPasswordMatched
      ? buildSuccessResponse(res, userData, "Logged In Successfully")
      : buildErrorResponse(res, "Invalid Credentials");
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials");
  }
});

export default userRouter;
