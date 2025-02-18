import Attendee from "../models/attendees.model.js";
import Event from "../models/event.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
//required field---> 1)eventName,2)description,3)targetAudience,4)eventType
// ,5)eventDate,6)address,7)hostName,8)hostEmail,9)attendees,10)bannner-->file
//get eventName,description,targetAudience,eventType,eventDate,address , banner--file
//  -->from client

//  hostName,hostEmail from req.user
//update attendees field while event registration
//TODO: Check for all requires fields
//TODO check that event already exists
//TODO:add hostName and hostEmail from user object
//TODO : Save Event inside DB and send Response

export const addEvent = async (req, res) => {
  try {
    const {
      eventName,
      description,
      targetAudience,
      eventType,
      eventDate,
      address,
      category,
      eventTime,
    } = req.body;
    const user = req.user.role;

    if (user !== "host" && user !== "admin") {
      return res.status(404).json({
        message: "Access denied",
      });
    }
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "Please upload a banner photo",
      });
    }
    const { path } = req.file;
    const uploadImage = await uploadToCloudinary(path);
    const parsedDate = new Date(eventDate);
    const data = {
      eventName,
      description,
      targetAudience,
      eventType,
      eventDate: parsedDate,
      address,
      category,
      bannerPhoto: uploadImage.url,
      hostEmail: req.user._id,
      eventTime,
    };

    const existingEvent = await Event.findOne({
      eventName: eventName,
      eventDate: parsedDate, // ensure parsedDate is consistent (e.g. UTC)
      hostEmail: req.user._id, // or host reference field
    });

    if (existingEvent) {
      return res.status(400).json({
        message: "An event with this name and date already exists for you.",
      });
    }

    const result = new Event(data);
    const response = await result.save();

    return res.status(200).json({
      message: "Success event",
      data: response,
    });
  } catch (error) {
    console.log("error while adding event ", error);
    return res.json({
      message: "Error occured during event creation",
      data: error,
    });
  }
};

export const getMyEvent = async (req, res) => {
  try {
    console.log("Program chala yaha tak");
    // if (req.user.role !== "host" && req.user.role !== "user") {
    //   return res.status(400).json({
    //     message: "Access Denied ",
    //   });
    // }

    if (req.user.role === "host" || req.user.role === "admin") {
      // const hostEmail = req.user.email;

      const findEvent = await Event.find({
        hostEmail: req.user._id,
      }).populate("hostEmail", "email name");

      console.log("Here is the event ", findEvent);

      if (!findEvent) {
        return res.status(400).json({
          message: `NO Events Found`,
        });
      }
      return res.status(200).json({
        message: `${req.user.name} your all events`,
        data: findEvent,
      });
    }
    if (req.user.role === "user") {
      const userId = req.user._id;
      const findEventId = await Attendee.find({
        user: userId,
      }).populate("event", "eventName");

      if (!findEventId) {
        return res.status(400).json({
          message: "No event Found",
        });
      }

      //   console.log("here is Event from attendee list", findEventId);
      return res.status(200).json({
        message: "Here is Your event",
        data: findEventId,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while fetching Events created by host",
      data: error,
    });
  }
};

export const UpdateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    if (!eventId) {
      return res.status(404).json({ message: "No Event Id is found" });
    }

    const findEvent = await Event.findById(eventId);
    if (!findEvent) {
      return res
        .status(404)
        .json({ message: `No Event found with id ${eventId}` });
    }

    // Destructure the fields from req.body
    const {
      eventName,
      description,
      targetAudience,
      eventType,
      eventDate,
      address,
      category,
      eventTime,
    } = req.body;

    console.log(eventName, eventTime);

    // Build updateData conditionally
    const updateData = {};

    if (eventName) updateData.eventName = eventName;
    if (description) updateData.description = description;
    if (targetAudience) updateData.targetAudience = targetAudience;
    if (eventType) updateData.eventType = eventType;
    if (address) updateData.address = address;
    if (category) updateData.category = category;
    if (eventTime) updateData.eventTime = eventTime;

    // Only update eventDate if provided and valid
    if (eventDate) {
      const parsedDate = new Date(eventDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid eventDate format" });
      }
      updateData.eventDate = parsedDate;
    }

    // Check and handle file upload if provided
    if (req.file && req.file.path) {
      const uploadImage = await uploadToCloudinary(req.file.path);
      updateData.bannerPhoto = uploadImage.url;
    }

    const updateEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
      runValidators: true,
      returnDocument: "after",
    });

    return res.status(201).json({
      message: `Event is successfully updated by ${req.user.name}`,
      data: updateEvent,
    });
  } catch (error) {
    console.log("Error ", error);
    return res.status(500).json({
      message: `Error while updating data: ${error.message}`,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    //get the event id from params
    const { eventId } = req.params;
    //check for role of user
    if (req.user.role !== "host" && req.user.role !== "admin") {
      return res.status(401).json({
        message: `${req.user.name} you are not authorize to delete the event`,
      });
    }

    if (req.user.role === "admin") {
      const deleteEvent = await Event.findByIdAndDelete(eventId);

      return res.status(201).json({
        message: `Event is successfully deleted `,
        data: deleteEvent,
      });
    }
    // delete the event using id

    const deleteEvent = await Event.deleteOne({
      _id: eventId,
      hostEmail: req.user._id,
    });

    console.log("Event to delete", deleteEvent);
    if (deleteEvent.deletedCount === 0) {
      return res.status(401).json({
        message: `${req.user.name} you are not authorize to delete this event`,
      });
    }

    return res.status(201).json({
      message: `Event is successfully deleted `,
      data: deleteEvent,
    });
  } catch (error) {
    console.log("Error while Deleting the event", error);
    return res.status(500).json({
      message: `Error while deleting the event ${error}`,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const fetchAllEvents = await Event.find({},{
      _id: 1,
      eventName: 1,
    });

    return res.status(200).json({
      message: `All Events`,
      data: fetchAllEvents,
    });
  } catch (error) {
    console.log("Error ", Error);

    return res.status(500).json({
      message: `Error incounter while fetching all events : ${error}`,
    });
  }
};
