
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"


export async function authorizeUser(req, res, next) {
  // console.log("token initiated",req.headers)
  try {
    const cookieToken = req?.cookies?.token;
  //  console.log("Token from cookie", cookieToken)
    const headerToken = req?.headers["authorization"]?.split(" ")[1];
    // console.log("Token from header", headerToken)

    const userToken = cookieToken || headerToken;
    // const userToken= [...request]
    // console.log("Token mila ", userToken);
    if (userToken) {
      const decodedToken = jwt.verify(userToken, process.env.PRIVATE_KEY);
      // console.log("token ko decode kiys", decodedToken);
      const verifiedUser = await User.findById(decodedToken._id);

      if (!verifiedUser) {
        return res.status(400).json({
          status: "false",
          message: "Invalid Token no user found",
        });
      }
      req.user = verifiedUser;
      next();
    } else {
      return res.status(400).json({
        status: "false",
        message: "Invalid Token",
      });
    }
  } catch (error) {
    console.log("Error while authorizing the user", error.message);
    return res.status(400).json({
      status: "false",
      message: `Error while authorizing ${error.message}`,
    });
  }
}


