import mongoose, { Schema } from "mongoose";
import { type } from "os";

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
    },
    bannerPhoto: {
      type: String,
      required: true,
      default: "https://placehold.co/600x400/000000/FFFFFF.png",
    },
    targetAudience: {
      type: [String],
      required: true,
      validate: (values) => {
        return values.length <= 5;
      },
    },
    eventType: {
      type: String,
      required: true,
      enum: {
        values: ["Virtual", "In-Person", "Hybrid"],
        message: `{VALUE} is not valid type `,
      },
    },
    eventDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    eventTime: {
      type: String,
      required: true,
    },
    hostEmail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
