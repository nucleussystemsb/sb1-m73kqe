import React, { useState } from 'react';
import { Calendar, Package, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import EventCalendar from './components/EventCalendar';
import EventDetails from './components/EventDetails';
import { Event } from './types';

const SAMPLE_EVENTS: Event[] = [
  {
    date: '2024-03-20',
    packages: [
      { name: 'Basic', minPax: 10, maxPax: 20, price: 299 },
      { name: 'Premium', minPax: 15, maxPax: 30, price: 499 },
    ],
    bookedPax: 12,
  },
  // Add more sample events as needed
];

function App() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const selectedEvent = SAMPLE_EVENTS.find(event => event.date === selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-indigo-600" />
            Event Management Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your events and package capacities</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Event Calendar
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-gray-600 font-medium">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <EventCalendar
              events={SAMPLE_EVENTS}
              selectedDate={selectedDate}
              currentMonth={currentMonth}
              onSelectDate={setSelectedDate}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-indigo-600" />
              Event Details
            </h2>
            <EventDetails event={selectedEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;