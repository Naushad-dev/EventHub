import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
    },
    bannerPhoto: {
      type: String,
      required:true
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
        message: `{VALUE} is not valid type `
      },
    },
    eventDate: {
      type: Date,
      required: true,
    },
    hostName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["confirmed", "pending", "declined"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
