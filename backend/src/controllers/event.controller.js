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
    } = req.body;
    const { path } = req.file;
    //check for data

    console.log("all data of event", {
      eventName,
      description,
      targetAudience,
      eventType,
      eventDate,
      address,
      path,
    });
    const userRole = req.user.role;
    if (userRole !== "host") {
      return res.status(400).json({
        message: `${req.user.name} only host can create Event.`,
      });
    }

    const hostName = req?.user?.name;
    const hostEmail = req?.user?.email;
    if (hostName === "" && hostEmail === "") {
      return res.status(400).json({
        message: `Host name and email required`,
      });
    }
    //uploading image to cloudinary
    if (!path) {
      return res.status(400).json({
        message: `${req.user.name} Please upload image`,
      });
    }
    const uploadImg = await uploadToCloudinary(path);
    const data = {
      eventName,
      description,
      path: uploadImg.url,
      targetAudience,
      eventType,
      eventDate,
      hostName,
      hostEmail,
      address,
    };
    const newEvent = new Event({
      eventName: data.eventName,
      description: data.description,
      bannerPhoto: data.path,
      targetAudience: data.targetAudience,
      eventType: data.eventType,
      eventDate: data.eventDate,
      hostName: data.hostName,
      hostEmail: data.hostEmail,
      address: data.address,
    });

    const result = await newEvent.save();
    if(!result){
      return res.status(400).json({
        message: `Error while saving in DB.`,
      });
    }
    console.log("resultu",result)

    return res.status(200).json({
      message: "Event created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while adding event " + error.message,
    });
  }
};
