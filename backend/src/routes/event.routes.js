import express from "express";
import { addEvent } from "../controllers/event.controller.js";

import { authorizeUser } from "../middleware/verifyUser.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { upload } from "../utils/fileUpload.js"; 
import { eventValidation } from "../utils/Validations.js";

const eventRouter = express.Router();




eventRouter.post("/createEvent",authorizeUser,verifyRole("admin","host"),eventValidation,upload.single("img"), addEvent);

export default eventRouter;
