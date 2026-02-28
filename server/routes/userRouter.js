import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default userRouter;
