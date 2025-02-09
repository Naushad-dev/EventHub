import React from 'react';
import { Link } from 'react-router';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col  m-8">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-500 mb-4">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <button className="mt-auto bg-[#f02e65] text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"  >
        <Link to={"/eventDetail"}>Register</Link>
          
        </button>
      </div>
    </div>
  );
};

export default EventCard;
