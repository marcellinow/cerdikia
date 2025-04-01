import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';

export default function Jadwal() {
  const [currentMonth, setCurrentMonth] = useState("September 2023");
  const [view, setView] = useState("Monthly");

  // Sample calendar data
  const calendarEvents = [
    { date: 2, title: "Design Review", color: "bg-red-100 text-red-600" },
    { 
      date: 5, 
      title: "Meeting", 
      time: "11:30 - 13:00", 
      color: "bg-yellow-100 text-yellow-600" 
    },
    { 
      date: 9, 
      events: [
        { 
          title: "Design Review", 
          time: "10:00 - 11:00", 
          color: "bg-red-100 text-red-600" 
        },
        { 
          title: "Discussion", 
          time: "10:00 - 11:00", 
          color: "bg-purple-100 text-purple-600" 
        }
      ]
    },
    { 
      date: 14, 
      events: [
        { 
          title: "Market Research", 
          color: "bg-green-100 text-green-600" 
        },
        { 
          title: "Discussion", 
          color: "bg-purple-100 text-purple-600" 
        }
      ]
    },
    { 
      date: 19, 
      events: [
        { 
          title: "Design Review", 
          color: "bg-red-100 text-red-600" 
        },
        { 
          title: "New Deals", 
          color: "bg-orange-100 text-orange-600" 
        }
      ]
    },
    { 
      date: 22, 
      events: [
        { 
          title: "Meeting", 
          color: "bg-yellow-100 text-yellow-600" 
        },
        { 
          title: "Design Review", 
          color: "bg-red-100 text-red-600" 
        }
      ]
    },
    { 
      date: 28, 
      events: [
        { 
          title: "Meeting", 
          color: "bg-yellow-100 text-yellow-600" 
        },
        { 
          title: "Design Review", 
          color: "bg-red-100 text-red-600" 
        },
        { 
          title: "New Deals", 
          color: "bg-orange-100 text-orange-600" 
        },
        { 
          title: "Discussion", 
          color: "bg-purple-100 text-purple-600" 
        }
      ]
    },
    { 
      date: 30, 
      events: [
        { 
          title: "Meeting", 
          color: "bg-yellow-100 text-yellow-600" 
        },
        { 
          title: "Design Review", 
          color: "bg-red-100 text-red-600" 
        },
        { 
          title: "New Deals", 
          color: "bg-orange-100 text-orange-600" 
        },
        { 
          title: "Discussion", 
          color: "bg-purple-100 text-purple-600" 
        }
      ]
    }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    // Previous month days (28, 29, 30)
    const prevMonthDays = [28, 29, 30];
    
    // Current month days (1-31)
    const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return [...prevMonthDays, ...currentMonthDays];
  };

  const days = generateCalendarDays();

  // Find events for a specific date
  const getEventsForDate = (date) => {
    const eventData = calendarEvents.find(event => event.date === date);
    if (!eventData) return [];
    
    if (eventData.events) {
      return eventData.events;
    } else {
      return [{ 
        title: eventData.title, 
        time: eventData.time || null, 
        color: eventData.color 
      }];
    }
  };

  return (
    <div className="p-6 bg-white">
      {/* Calendar Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Calendar</h1>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <button 
              className={`pb-2 px-2 ${view === 'Monthly' ? 'text-orange-500 border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setView('Monthly')}
            >
              Monthly
            </button>
            <button 
              className={`pb-2 px-2 ${view === 'Weekly' ? 'text-orange-500 border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setView('Weekly')}
            >
              Weekly
            </button>
            <button 
              className={`pb-2 px-2 ${view === 'Daily' ? 'text-orange-500 border-b-2 border-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setView('Daily')}
            >
              Daily
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border rounded-md text-orange-500">
              <Filter className="w-4 h-4 mr-2" />
              <span>Filter</span>
            </button>
            <button className="flex items-center px-4 py-2 rounded-md bg-orange-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              <span>Add Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-medium text-orange-500">{currentMonth}</h2>
          <ChevronDown className="w-5 h-5 text-orange-500" />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm">
            Today
          </button>
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-md">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center py-2 border-b bg-gray-50">
          <div className="text-gray-500 font-medium">Sun</div>
          <div className="text-gray-500 font-medium">Mon</div>
          <div className="text-gray-500 font-medium">Tue</div>
          <div className="text-gray-500 font-medium">Wed</div>
          <div className="text-gray-500 font-medium">Thu</div>
          <div className="text-gray-500 font-medium">Fri</div>
          <div className="text-gray-500 font-medium">Sat</div>
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const events = getEventsForDate(day);
            const isPreviousMonth = day < 31 && index < 3;
            
            return (
              <div 
                key={index} 
                className={`min-h-[120px] p-2 border ${isPreviousMonth ? 'text-gray-400' : 'text-gray-700'}`}
              >
                <div className="text-sm mb-2">{day}</div>
                <div className="space-y-1">
                  {events.map((event, eventIndex) => (
                    <div 
                      key={eventIndex} 
                      className={`p-1 rounded text-xs ${event.color}`}
                    >
                      <div className="font-medium">{event.title}</div>
                      {event.time && <div>{event.time}</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Missing ChevronDown component, adding it here
function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}