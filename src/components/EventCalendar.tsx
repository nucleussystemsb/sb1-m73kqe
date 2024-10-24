import React from 'react';
import { Event } from '../types';

interface EventCalendarProps {
  events: Event[];
  selectedDate: string | null;
  currentMonth: Date;
  onSelectDate: (date: string) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  selectedDate,
  currentMonth,
  onSelectDate,
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDateString = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const getEventForDate = (date: string) => events.find(event => event.date === date);

  return (
    <div className="select-none">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(startingDay).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {days.map(day => {
          const dateString = getDateString(day);
          const event = getEventForDate(dateString);
          const isSelected = dateString === selectedDate;

          return (
            <button
              key={day}
              onClick={() => onSelectDate(dateString)}
              className={`
                aspect-square p-2 rounded-lg transition-all
                ${event ? 'hover:bg-indigo-50 cursor-pointer' : 'cursor-default'}
                ${isSelected ? 'bg-indigo-100 ring-2 ring-indigo-400' : ''}
              `}
            >
              <div className="h-full flex flex-col">
                <span className={`text-sm ${isSelected ? 'font-medium' : ''}`}>
                  {day}
                </span>
                {event && (
                  <div className="mt-auto">
                    <div className="w-full h-1 bg-indigo-400 rounded-full" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;