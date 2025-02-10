import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export async function RegisterUser(req, res) {
  //TODOS
  // 1. Get the user data from the request body
  // 2. Check if the user already exists in the database
  // 3. If the user does not exist, hash the password
  // 4. Generate a JWT token
  // 5. Save the user to the database
  // 6. Send a success response

  try {
    const { name, email, password, role } = req.body;
    
    console.log("Log from server", name, email, password, role);

    const existingUser = await User.userAlreadyExists(email);
    // console.log("user", user);
    if (existingUser) {
      return res.status(401).json({
        status: "false",
        message: "User already exists",
      });
    }


    const newUser = new User({ name, email, password, role });

    const userRegisterd = await newUser.save();
    if (userRegisterd) {
      return res.status(200).json({
        status: "success",
        message: "User Registered successfully",
        user: userRegisterd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: "error",
      message: "Error while Registering user",
    });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(400).json({
        status: "false",
        message: "User does not exist",
      });
    }

    // compare password
    // const isMatch = await bycrypt.compare(password, findUser.password);
    const isMatch = await findUser.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({
        status: "false",
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ _id: findUser._id }, process.env.PRIVATE_KEY, {
      expiresIn: "7d",
    });
    console.log("token generated: ", token);

    const updateUser = await User.findByIdAndUpdate(
      { _id: findUser._id },
      { token: token },
      { returnDocument: "after" }
    );
    // console.log("updateUser", updateUser);
    res.cookie("token", token, { maxAge: 2 * 24 * 60 * 60 * 1000 }); // 2 days in milliseconds
    return res.status(200).json({
      status: "success",
      message: "User Login successfully",
      data: findUser,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error while Login user",
    });
  }
}
