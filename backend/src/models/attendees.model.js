import mongoose, { Schema } from "mongoose";

const attendeeSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);
export default Attendee;
