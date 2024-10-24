import React from 'react';
import { Package, Users, DollarSign } from 'lucide-react';
import { Event } from '../types';

interface EventDetailsProps {
  event: Event | undefined;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a date to view event details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {new Date(event.date).toLocaleDateString('default', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span>Current bookings: {event.bookedPax} pax</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Available Packages
        </h4>
        {event.packages.map((pkg, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <h5 className="font-medium text-gray-900">{pkg.name}</h5>
              <div className="flex items-center text-green-600">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">{pkg.price}</span>
              </div>
            </div>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Minimum: {pkg.minPax} pax</p>
              <p>Maximum: {pkg.maxPax} pax</p>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${(event.bookedPax / pkg.maxPax) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500 text-right">
                {Math.round((event.bookedPax / pkg.maxPax) * 100)}% capacity
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;