import React, { useState } from 'react';
import EventCard from '../components/EventCard'; // adjust the path as needed

const dummyEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: '2025-05-20',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Conference'
  },
  {
    id: 2,
    title: 'Music Festival',
    date: '2025-06-15',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Festival'
  },
  {
    id: 3,
    title: 'Art Exhibition',
    date: '2025-07-01',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Exhibition'
  },
  {
    id: 4,
    title: 'Food Carnival',
    date: '2025-08-10',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Festival'
  },
  {
    id: 5,
    title: 'Startup Meetup',
    date: '2025-09-05',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Conference'
  },
  {
    id: 6,
    title: 'Fashion Expo',
    date: '2025-10-20',
    image: 'https://images.pexels.com/photos/3321789/pexels-photo-3321789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Exhibition'
  }
];

const AllEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredEvents = dummyEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? event.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 py-8" >
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Conference">Conference</option>
            <option value="Festival">Festival</option>
            <option value="Exhibition">Exhibition</option>
          </select>
        </div>
      </div>

      {/* Grid of Event Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-8">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
