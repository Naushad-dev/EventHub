import express from "express";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getMyEvent,
  UpdateEvent,
} from "../controllers/event.controller.js";

import { authorizeUser } from "../middleware/verifyUser.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { upload } from "../utils/fileUpload.js";
import { eventValidation } from "../utils/Validations.js";
import { getAttendees, getPendingRequest, registerUserForEvent } from "../controllers/attendess.controller.js";

const eventRouter = express.Router();

eventRouter.post(
  "/createEvent",
  authorizeUser,
  verifyRole("admin", "host"),
  upload.single("img"),

  addEvent
);
eventRouter.patch("/editEvent/:eventId", authorizeUser, UpdateEvent);

eventRouter.get(
  "/getMyEvents",
  authorizeUser,
  verifyRole("admin", "host", "user"),
  getMyEvent
);

eventRouter.post(
  "/registerForEvent/:eventId",
  authorizeUser,
  registerUserForEvent
);
eventRouter.delete(
  "/deleteEvent/:eventId",
  authorizeUser,
  verifyRole("host", "admin"),
  deleteEvent
);

eventRouter.get("/getAttendess/:eventId",getAttendees)


eventRouter.get("/getAllEvents", getAllEvents)
eventRouter.put("/acceptRequest/:requestId", authorizeUser, verifyRole("admin","host"), acceptRequest)
export default eventRouter;
