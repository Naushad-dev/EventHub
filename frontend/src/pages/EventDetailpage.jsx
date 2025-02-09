import React from "react";
import EventDetail from "../components/EventDetail";

const eventData = {
  logo: "https://via.placeholder.com/150", // Replace with your event logo URL
  title: "Appwrite Conf",
  host: "Rohit",
  date: "2023-11-20",
  location: "SMQ-133/04, Vayusena Nagar, Nagpur, Maharashtra",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo erat quis libero dignissim hendrerit.",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0869904563!2d144.9537363155836!3d-37.81627937975182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577a24c6729cfd4!2sMelbourne!5e0!3m2!1sen!2sau!4v1632545978641!5m2!1sen!2sau",
  locationDetails: "Nagpur, Maharashtra, IN - 440007",
};



const EventDetailpage = () => {
  return(
  <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
  <EventDetail event={eventData} />
</div>)
}

export default EventDetailpage