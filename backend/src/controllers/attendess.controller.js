import Attendee from "../models/attendees.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

export const registerUserForEvent = async (req, res) => {
  //get event id from req
  //get attendee user from login user
  //verify and add to attendess DB
  try {
    const userId = req?.user?._id;
    const eventId = req?.params?.eventId;
    // verify data is provided
    if (!userId || !eventId) {
      return res.status(400).json({
        message: "Invalid UserId or EventId",
      });
    }

    // check wheather event and user exist in DB

    const userExists = await User.findById(userId);
    const eventExists = await Event.findById(eventId);

    if (!userExists || !eventExists) {
      return res.status(400).json({
        message: "user or event dont exists",
      });
    }

    const isUserAlreadyRegistered = await Attendee.findOne({
      user: userId,
      event: eventId,
    });

    if (isUserAlreadyRegistered) {
      return res.status(400).json({
        message: `${req.user.name} you have already registered `,
      });
    }

    // add user to attendee
    const registerEvent = new Attendee({
      event: eventId,
      user: userId,
    });

    const userRegistered = await registerEvent.save();

    await userRegistered.populate("user", "name email");

    return res.status(200).json({
      message: `User Register successfully`,
      data: userRegistered,
    });
  } catch (error) {
    console.log(`Error while Registering ${error.message}`);

    return res.status(400).json({
      message: `Error while Registring Event ${error.message} `,
    });
  }
};

export const getAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const attendees = await Attendee.find({
      event: eventId,
      status: "accepted",
    })
      .populate("user", "name")
      .populate("event", "eventName");

    console.log(attendees.length);
    let totalAttendees = attendees.length;

    return res.status(200).json({
      message: `Here is list of all attendess`,
      data: attendees,
      totalAttendees: totalAttendees,
    });
  } catch (error) {
    console.log("Error while fetching", error);
    return res.status(500).json({
      message: `Error while getting all attendees ${error} `,
    });
  }
};

export const getPendingRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const loggedInUser = req.user._id;
    const request = await Attendee.findById(requestId);
    const EventName = await Event.findOne({ _id: request.event });
    // console.log(eventCreateBy.event);
    console.log("Host", EventName.hostEmail);
    console.log("LogedIn", loggedInUser)

    if (EventName.hostEmail.toString() !== loggedInUser.toString()) {
      return res.status(401).json({
        message: `You can not accept other request NOT AUTHORIZED`,
      });
    }

    const acceptUser = await Attendee.findByIdAndUpdate(
      {
        _id: requestId,
      },
      { status: "accepted" }
    );

    return res.status(200).json({
      message: "Your request has been accepted and you are approved",
      data: acceptUser,
    });
  } catch (error) {
    console.log("Error while fetching", error);
    return res.status(500).json({
      message: `Error while getting pending request attendees ${error} `,
    });
  }
};
