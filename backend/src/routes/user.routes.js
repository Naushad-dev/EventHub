import express from "express";
import { authorizeUser } from "../middleware/verifyUser.js";
import { verifyRole } from "../middleware/verifyRole.js";
const userRouter = express.Router();

userRouter.get(
  "/admin",
  authorizeUser,
  verifyRole("admin"),
  async (req, res) => {
    const user = req.user;
    return res.json({
      message: `Welcome ${user.name} to the board`,
    });
  }
);
userRouter.get(
    "/host",
    authorizeUser,
    verifyRole("admin","host"),
    async (req, res) => {
      const user = req.user;
      return res.json({
        message: `Welcome ${user.name} host your events`,
      });
    }
  );
  
  userRouter.get(
    "/user",
    authorizeUser,
    verifyRole("admin","host","user"),
    async (req, res) => {
      const user = req.user;
      return res.json({
        message: `Welcome ${user.name} register for events`,
      });
    }
  );
  

export default userRouter;
