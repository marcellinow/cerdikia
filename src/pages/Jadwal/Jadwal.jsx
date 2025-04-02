import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Filter, ChevronDown } from "lucide-react"
import Header from "../../components/Header"
import Layout from "../../components/Layout" // Import the Layout component
import "./Jadwal.css" // Import the CSS file

export default function Jadwal() {
  const [currentMonth, setCurrentMonth] = useState("September 2023")
  const [view, setView] = useState("Monthly")

  // Sample calendar data
  const calendarEvents = [
    { date: 2, title: "Design Review", color: "red" },
    { date: 5, title: "Meeting", time: "11:30 - 13:00", color: "yellow" },
    {
      date: 9,
      events: [
        { title: "Design Review", time: "10:00 - 11:00", color: "red" },
        { title: "Discussion", time: "10:00 - 11:00", color: "purple" },
      ],
    },
    {
      date: 14,
      events: [
        { title: "Market Research", color: "green" },
        { title: "Discussion", color: "purple" },
      ],
    },
    {
      date: 19,
      events: [
        { title: "Design Review", color: "red" },
        { title: "New Deals", color: "orange" },
      ],
    },
    {
      date: 22,
      events: [
        { title: "Meeting", color: "yellow" },
        { title: "Design Review", color: "red" },
      ],
    },
    {
      date: 28,
      events: [
        { title: "Meeting", color: "yellow" },
        { title: "Design Review", color: "red" },
        { title: "New Deals", color: "orange" },
        { title: "Discussion", color: "purple" },
      ],
    },
    {
      date: 30,
      events: [
        { title: "Meeting", color: "yellow" },
        { title: "Design Review", color: "red" },
        { title: "New Deals", color: "orange" },
        { title: "Discussion", color: "purple" },
      ],
    },
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const prevMonthDays = [28, 29, 30]
    const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1)
    return [...prevMonthDays, ...currentMonthDays]
  }

  const days = generateCalendarDays()

  // Find events for a specific date
  const getEventsForDate = (date) => {
    const eventData = calendarEvents.find((event) => event.date === date)
    if (!eventData) return []
    return (
      eventData.events || [
        {
          title: eventData.title,
          time: eventData.time,
          color: eventData.color,
        },
      ]
    )
  }

  return (
    <Layout>
      <div className="jadwal-container">
        <Header />
        <main className="jadwal-main">
          {/* Calendar Title and View Tabs */}
          <div className="jadwal-header">
            <div className="jadwal-title-container">
              <h1 className="jadwal-title">Calendar</h1>
              <div className="jadwal-tabs">
                {["Monthly", "Weekly", "Daily"].map((v) => (
                  <button key={v} className={`jadwal-tab ${view === v ? "active" : ""}`} onClick={() => setView(v)}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="jadwal-actions">
              <button className="jadwal-button filter">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button className="jadwal-button add">
                <Plus size={16} />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="jadwal-month-navigation">
            <div className="jadwal-month-controls">
              <div className="jadwal-month-selector">
                <span>{currentMonth}</span>
                <ChevronDown size={16} />
              </div>
              <div className="jadwal-navigation-arrows">
                <button className="nav-button">
                  <ChevronLeft size={16} />
                </button>
                <button className="jadwal-today-button">Today</button>
                <button className="nav-button">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="jadwal-calendar">
            <div className="jadwal-calendar-header">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="calendar-header-cell">
                  {day}
                </div>
              ))}
            </div>
            <div className="jadwal-calendar-days">
              {days.map((day, index) => {
                const events = getEventsForDate(day)
                const isPreviousMonth = day < 31 && index < 3

                return (
                  <div key={index} className={`jadwal-calendar-day ${isPreviousMonth ? "previous-month" : ""}`}>
                    <div className="day-number">{day}</div>
                    <div className="day-events">
                      {events.map((event, i) => (
                        <div key={i} className={`event ${event.color}`}>
                          <div className="event-title">{event.title}</div>
                          {event.time && <div className="event-time">{event.time}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

