import React from "react";

const EventDetail = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-full object-cover filter blur-xs"
            alt="Event Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Appwrite Conf</h1>
            <p className="text-sm mt-2 text-slate-300">-Hosted by Rohit</p>
            <p className="text-lg mt-2">2023-11-20</p>
          </div>
        </div>

        {/* Registration Section */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">Registration</h2>
          <p className="mb-4">
            Hello! To join the event, please register below.
          </p>
          <button className="bg-[#f02e65] text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </div>

        {/* About Event Section */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">About Event</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo
            erat quis libero dignissim hendrerit. Duis eleifend tempus risus in
            ultrices. Donec in justo in massa mustis eleifend. Penetracepte nec
            feugiat libero. Vivamus egestas pulviner.
          </p>
        </div>

        {/* Location Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <p className="text-gray-700">Nagpur</p>
          <p className="text-gray-700">SMQ: 133/04, Vayusena Nagar</p>
          <p className="text-gray-700">Nagpur, Maharashtra, IN 440007</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;