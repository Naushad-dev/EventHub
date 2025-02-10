import express from "express";
import { Login, RegisterUser } from "../controllers/user.controller.js";
import { SignUpValidation, LoginValidation } from "../utils/Validations.js";
import { authorizeUser } from "../middleware/verifyUser.js";
const authRouter = express.Router();

authRouter.post("/register", SignUpValidation, RegisterUser);
authRouter.post("/login", LoginValidation, Login);
authRouter.get("/check-working", async (req, res) => res.send("Working"));

export default authRouter;
