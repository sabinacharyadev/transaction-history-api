import express from "express";
const userRouter = express.Router();

// CREATE | POST

userRouter.post("/", (req, res) => {
  res.json(req.body);
});

export default userRouter;
