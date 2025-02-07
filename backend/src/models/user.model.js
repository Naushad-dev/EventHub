import mongoose from "mongoose";

const { Schema } = mongoose;
import bycrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "guest",
      enum: {
        values: ["admin", "user", "guest","host"],
        message: `{VALUE} access not granted for this type user`,
      },
    },
    token:{
        type:String,

    }
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
  } catch (error) {
    throw new Error("Error while hashing the password");
  }
});

UserSchema.statics.userAlreadyExists = async function (email) {
  try {
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error while checking user existence");
  }
};

UserSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bycrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error while comparing password");
  }
};
const User = mongoose.model("User", UserSchema);

export default User;

