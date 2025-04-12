"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Plus, Filter, ChevronDown, X, Clock, Calendar, Loader2 } from "lucide-react"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import "./Jadwal.css"
// Import Firebase modules
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, query, where, Timestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../../firebase/firebase"

export default function Jadwal() {
  // State untuk tanggal, view, dan event
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState("")
  const [view, setView] = useState("Monthly")
  const [selectedDate, setSelectedDate] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", color: "orange", time: "" })
  const [customEvents, setCustomEvents] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    red: true,
    yellow: true,
    green: true,
    purple: true,
    orange: true,
  })
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)
  const [realTime, setRealTime] = useState(new Date())
  const [timeError, setTimeError] = useState("")
  const [loading, setLoading] = useState(true)

  const monthDropdownRef = useRef(null)

  // Update month name when currentDate changes
  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    setCurrentMonth(`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`)
  }, [currentDate])

  // Fetch events from Firebase when component mounts
  useEffect(() => {
    fetchEvents()

    // Clean up function
    return () => {
      // Cleanup any active listeners here
      setCustomEvents([])
      setLoading(false)
    }
  }, [])

  // Add this useEffect to refresh events when needed
  useEffect(() => {
    if (!loading) {
      fetchEvents()
    }
  }, [currentDate]) // Refresh when date changes

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setShowMonthDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [monthDropdownRef])

  // Firebase Functions
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const auth = getAuth()
      const user = auth.currentUser

      let eventsQuery
      if (user) {
        eventsQuery = query(collection(db, "schedules"), where("uid", "in", [user.uid, "public"]))
      } else {
        eventsQuery = query(collection(db, "schedules"), where("uid", "==", "public"))
      }

      const eventsSnapshot = await getDocs(eventsQuery)
      const eventsData = eventsSnapshot.docs.map((doc) => {
        const data = doc.data()
        // Convert Firestore Timestamp to JavaScript Date
        const eventDate = data.date instanceof Timestamp ? data.date.toDate() : new Date()

        return {
          id: doc.id,
          title: data.title || "",
          color: data.color || "orange",
          time: data.time || "",
          date: eventDate,
          uid: data.uid || "public",
        }
      })

      setCustomEvents(eventsData)
    } catch (error) {
      console.error("Error fetching events:", error)
      alert("Gagal mengambil data jadwal. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const addEventToFirebase = async (eventData) => {
    try {
      if (!eventData.title || !eventData.date) {
        throw new Error("Data event tidak lengkap")
      }

      const auth = getAuth()
      const user = auth.currentUser

      const firestoreEvent = {
        title: eventData.title,
        color: eventData.color,
        time: eventData.time || "",
        date: Timestamp.fromDate(eventData.date),
        createdAt: Timestamp.now(),
        uid: user ? user.uid : "public",
      }

      const docRef = await addDoc(collection(db, "schedules"), firestoreEvent)

      // Add to local state with the correct date format
      const newEvent = {
        ...eventData,
        id: docRef.id,
        uid: firestoreEvent.uid,
      }

      setCustomEvents((prev) => [...prev, newEvent])
      return docRef.id
    } catch (error) {
      console.error("Error adding event:", error)
      throw error
    }
  }

  const deleteEventFromFirebase = async (eventId) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser

      // Get the event reference
      const eventRef = doc(db, "schedules", eventId)
      const eventSnap = await getDoc(eventRef)

      if (!eventSnap.exists()) {
        throw new Error("Event tidak ditemukan")
      }

      const eventData = eventSnap.data()

      // Check permissions
      if (eventData.uid === "public" || (user && eventData.uid === user.uid)) {
        await deleteDoc(eventRef)
        // Update local state
        setCustomEvents((prev) => prev.filter((event) => event.id !== eventId))
        return true
      } else {
        throw new Error("Anda tidak memiliki izin untuk menghapus event ini")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert(error.message || "Gagal menghapus event")
      return false
    }
  }

  // Generate calendar days for monthly view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of the month
    const firstDay = new Date(year, month, 1).getDay()

    // Get number of days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Get number of days in previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    // Previous month days
    const prevMonthDays = []
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        month: "prev",
        date: new Date(year, month - 1, daysInPrevMonth - i),
      })
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month: "current",
        date: new Date(year, month, i),
      })
    }

    // Next month days to fill grid
    const totalDaysToShow = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const nextMonthDays = []
    const remainingDays = totalDaysToShow - (prevMonthDays.length + currentMonthDays.length)

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        month: "next",
        date: new Date(year, month + 1, i),
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Generate weekly view days
  const generateWeekDays = () => {
    const date = new Date(currentDate)
    const day = date.getDay()
    date.setDate(date.getDate() - day) // Start from Sunday

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date)
      weekDays.push({
        day: currentDay.getDate(),
        month:
          currentDay.getMonth() === currentDate.getMonth()
            ? "current"
            : currentDay.getMonth() < currentDate.getMonth()
              ? "prev"
              : "next",
        date: new Date(currentDay),
      })
      date.setDate(date.getDate() + 1)
    }

    return weekDays
  }

  // Generate mini calendar for month dropdown
  const generateMiniCalendar = () => {
    const currentYear = currentDate.getFullYear()
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const calendarRows = []
    for (let i = 0; i < 4; i++) {
      const calendarRow = []
      for (let j = 0; j < 3; j++) {
        const monthIndex = i * 3 + j
        calendarRow.push({
          month: months[monthIndex],
          index: monthIndex,
        })
      }
      calendarRows.push(calendarRow)
    }

    const years = [currentYear - 1, currentYear, currentYear + 1]

    return { calendarRows, years }
  }

  // Get day name
  const getDayName = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[date.getDay()]
  }

  // Validate event time format
  const validateTimeFormat = (timeString) => {
    if (!timeString) return true // Optional time is valid

    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])\s*-\s*([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    if (!timePattern.test(timeString)) {
      return false
    }

    const [startTime, endTime] = timeString.split("-").map((t) => t.trim())
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    return endTotalMinutes > startTotalMinutes
  }

  // Format time based on 24-hour format
  const formatTimeString = (timeString) => {
    if (!timeString) return ""

    return timeString.replace(/(\d{1,2}):(\d{2})/g, (match, hour, minute) => {
      const hourNum = Number.parseInt(hour)
      const formattedHour = hourNum.toString().padStart(2, "0")
      return `${formattedHour}:${minute}`
    })
  }

  // Parse time to position in daily view
  const parseTimeToPosition = (timeString) => {
    if (!timeString) return { start: 0, duration: 0, startHour: 0 }

    const [startTime] = timeString.split("-").map((t) => t.trim())
    const [startHour, startMinute] = startTime.split(":").map(Number)

    const endTimePart = timeString.split("-")[1]?.trim()
    let endHour, endMinute

    if (endTimePart) {
      ;[endHour, endMinute] = endTimePart.split(":").map(Number)
    } else {
      endHour = startHour + 1
      endMinute = startMinute
    }

    const startPosition = ((startHour * 60 + startMinute) / 1440) * 100 // percentage of day
    const endPosition = ((endHour * 60 + endMinute) / 1440) * 100
    const duration = endPosition - startPosition

    return { start: startPosition, duration, startHour }
  }

  // Find events for a specific date
  const getEventsForDate = (day) => {
    // Custom events from Firebase
    const customEventsForDay = customEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day.day &&
        eventDate.getMonth() === day.date.getMonth() &&
        eventDate.getFullYear() === day.date.getFullYear()
      )
    })

    // Filter events based on active filters
    return customEventsForDay.filter((event) => activeFilters[event.color])
  }

  // Check if event is happening now
  const isEventNow = (event) => {
    if (!event.time) return false

    const [startTime, endTime] = event.time.split("-").map((t) => t.trim())
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    const currentTotalMinutes = currentHour * 60 + currentMinute
    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    return currentTotalMinutes >= startTotalMinutes && currentTotalMinutes <= endTotalMinutes
  }

  // Navigation handlers
  const handlePrevious = () => {
    if (view === "Monthly") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (view === "Weekly") {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 7)
      setCurrentDate(newDate)
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 1)
      setCurrentDate(newDate)
    }
  }

  const handleNext = () => {
    if (view === "Monthly") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (view === "Weekly") {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 7)
      setCurrentDate(newDate)
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 1)
      setCurrentDate(newDate)
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1))
    setShowMonthDropdown(false)
  }

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1))
    setShowMonthDropdown(false)
  }

  // Event handlers
  const handleAddEvent = () => {
    if (!selectedDate) {
      alert("Silakan pilih tanggal terlebih dahulu")
      return
    }
    setShowEventForm(true)
    setTimeError("")
  }

  const handleSaveEvent = async () => {
    if (!newEvent.title.trim()) {
      alert("Judul event tidak boleh kosong")
      return
    }

    // Validate time format
    if (newEvent.time && !validateTimeFormat(newEvent.time)) {
      setTimeError("Format waktu harus valid (contoh: 09:00 - 10:30) dan waktu akhir harus setelah waktu awal")
      return
    }

    const formattedTime = formatTimeString(newEvent.time)

    const eventData = {
      title: newEvent.title,
      color: newEvent.color,
      time: formattedTime,
      date: selectedDate.date,
    }

    // Add event to Firebase
    const eventId = await addEventToFirebase(eventData)

    if (eventId) {
      // Reset form after successful addition
      setNewEvent({ title: "", color: "orange", time: "" })
      setShowEventForm(false)
      setTimeError("")
    } else {
      alert("Gagal menambahkan event. Silakan coba lagi.")
    }
  }

  const handleDeleteEvent = async (eventToDelete) => {
    if (eventToDelete.id) {
      // Delete event from Firebase if it has an ID
      const success = await deleteEventFromFirebase(eventToDelete.id)
      if (!success) {
        alert("Gagal menghapus event. Silakan coba lagi.")
      }
    } else {
      // Handle deletion of hardcoded events or events without ID
      setCustomEvents(
        customEvents.filter(
          (event) =>
            event.title !== eventToDelete.title ||
            new Date(event.date).getTime() !== new Date(eventToDelete.date).getTime(),
        ),
      )
    }
  }

  const toggleFilter = (color) => {
    setActiveFilters({
      ...activeFilters,
      [color]: !activeFilters[color],
    })
  }

  // Render views
  const renderMonthlyView = () => {
    const days = generateCalendarDays()

    return (
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
            const isSelected =
              selectedDate &&
              selectedDate.day === day.day &&
              selectedDate.date.getMonth() === day.date.getMonth() &&
              selectedDate.date.getFullYear() === day.date.getFullYear()
            const isToday = day.date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`jadwal-calendar-day ${day.month !== "current" ? "previous-month" : ""} 
                            ${isSelected ? "selected-date" : ""} ${isToday ? "today" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="day-number">{day.day}</div>
                <div className="day-events">
                  {events.map((event, i) => {
                    const isCurrentEvent = isEventNow(event) && day.date.toDateString() === new Date().toDateString()
                    return (
                      <div key={i} className={`event ${event.color} ${isCurrentEvent ? "current-event" : ""}`}>
                        <div className="event-title">
                          {isCurrentEvent && <Clock size={12} className="event-now-icon" />}
                          {event.title}
                        </div>
                        {event.time && <div className="event-time">{event.time}</div>}
                        {/* Show delete button for all events since we can delete both custom and Firebase events */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteEvent(event)
                          }}
                          className="event-delete-btn"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderWeeklyView = () => {
    const weekDays = generateWeekDays()

    return (
      <div className="jadwal-calendar weekly-view">
        <div className="jadwal-calendar-header">
          {weekDays.map((day, index) => {
            const isToday = day.date.toDateString() === new Date().toDateString()
            return (
              <div key={index} className={`calendar-header-cell ${isToday ? "today" : ""}`}>
                {getDayName(day.date).slice(0, 3)}
                <div style={{ fontSize: "12px", marginTop: "4px" }}>{day.day}</div>
              </div>
            )
          })}
        </div>
        <div className="weekly-view-grid">
          {weekDays.map((day, index) => {
            const events = getEventsForDate(day)
            const isSelected =
              selectedDate &&
              selectedDate.day === day.day &&
              selectedDate.date.getMonth() === day.date.getMonth() &&
              selectedDate.date.getFullYear() === day.date.getFullYear()
            const isToday = day.date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`jadwal-calendar-day weekly-day-cell ${day.month !== "current" ? "previous-month" : ""} 
                            ${isSelected ? "selected-date" : ""} ${isToday ? "today" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="day-events">
                  {events.map((event, i) => {
                    const isCurrentEvent = isEventNow(event) && day.date.toDateString() === new Date().toDateString()
                    return (
                      <div key={i} className={`event ${event.color} ${isCurrentEvent ? "current-event" : ""}`}>
                        <div className="event-title">
                          {isCurrentEvent && <Clock size={12} className="event-now-icon" />}
                          {event.title}
                        </div>
                        {event.time && <div className="event-time">{event.time}</div>}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteEvent(event)
                          }}
                          className="event-delete-btn"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDailyView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i) // 0-23 hours
    const dayEvents = getEventsForDate({
      day: currentDate.getDate(),
      date: currentDate,
      month: "current",
    })

    // Get current hour for highlighting
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    const isCurrentDay = currentDate.toDateString() === new Date().toDateString()

    // Calculate positions for all events once
    const eventsWithPosition = dayEvents
      .filter((event) => event.time) // Only timed events
      .map((event) => {
        const { start, duration, startHour } = parseTimeToPosition(event.time)
        return {
          ...event,
          start,
          duration,
          startHour,
        }
      })

    return (
      <div className="jadwal-calendar daily-view">
        <div className="daily-view-header">
          <div>
            {getDayName(currentDate)} - {currentDate.getDate()} {currentMonth}
          </div>
          {isCurrentDay && (
            <div className="current-time-indicator">
              <Clock size={16} />
              {realTime.getHours().toString().padStart(2, "0")}:{realTime.getMinutes().toString().padStart(2, "0")}
            </div>
          )}
        </div>
        <div className="daily-view-content">
          {hours.map((hour) => {
            const isCurrentHour = hour === currentHour && isCurrentDay
            // Get events that span this hour
            const hourEvents = eventsWithPosition.filter((event) => {
              // The event starts in this hour or covers this hour
              const startHour = Math.floor(event.start / (100 / 24))
              const eventDurationInHours = event.duration / (100 / 24)
              const endHour = startHour + eventDurationInHours

              return startHour === hour || (startHour < hour && endHour > hour)
            })

            return (
              <div key={hour} className={`daily-hour-row ${isCurrentHour ? "current-hour" : ""}`}>
                <div className="daily-hour-label">{hour.toString().padStart(2, "0")}:00</div>

                <div className="daily-hour-events-container">
                  {isCurrentHour && isCurrentDay && (
                    <div className="current-time-line" style={{ top: `${(currentMinute / 60) * 100}%` }} />
                  )}

                  <div className="daily-hour-events">
                    {hourEvents.map((event, i) => {
                      const isCurrentEvent = isEventNow(event) && isCurrentDay

                      // Calculate relative position within this hour cell
                      let topPosition = 0
                      let heightPercent = 100 // default to fill the hour

                      if (event.startHour === hour) {
                        // If event starts in this hour, calculate top position
                        const [startTime] = event.time.split(" - ")
                        const minuteInHour = Number.parseInt(startTime.split(":")[1])
                        topPosition = (minuteInHour / 60) * 100

                        // Calculate how much of the event fits in this hour
                        const remainingMinutesInHour = 60 - minuteInHour
                        const eventDurationInMinutes = (event.duration / 100) * 1440
                        const heightInThisHour = Math.min(remainingMinutesInHour, eventDurationInMinutes)
                        heightPercent = (heightInThisHour / 60) * 100
                      } else if (event.startHour < hour) {
                        // If event started in a previous hour, it continues from the top
                        topPosition = 0

                        // Calculate how much of the event remains in this hour
                        const eventEndHour = event.startHour + event.duration / (100 / 24)
                        const remainingHours = eventEndHour - hour
                        heightPercent = Math.min(100, remainingHours * 100)
                      }

                      return (
                        <div
                          key={i}
                          className={`event timed-event ${event.color} ${isCurrentEvent ? "current-event" : ""}`}
                          style={{
                            top: `${topPosition}%`,
                            height: `${heightPercent}%`,
                            minHeight: "30px", // Ensure minimum height for visibility
                            zIndex: 10, // Ensure events are above hour lines
                          }}
                        >
                          <div className="event-title">
                            {isCurrentEvent && <Clock size={12} className="event-now-icon" />}
                            {event.title}
                          </div>
                          <div className="event-time">{event.time}</div>
                          <button onClick={() => handleDeleteEvent(event)} className="event-delete-btn">
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="jadwal-container">
        <Header />
        <main className="jadwal-main">
          {loading ? (
            <div className="loading-state">
              <Loader2 className="animate-spin mr-2" size={20} />
              <span>Loading calendar...</span>
            </div>
          ) : (
            <>
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
                  <button className="jadwal-button filter" onClick={() => setShowFilter(!showFilter)}>
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <button className="jadwal-button add" onClick={handleAddEvent}>
                    <Plus size={16} />
                    <span>Add Event</span>
                  </button>
                </div>
              </div>

              {/* Filter dropdown */}
              {showFilter && (
                <div className="filter-dropdown">
                  <div className="filter-heading">Filter by category:</div>
                  <div className="filter-options">
                    {["red", "yellow", "green", "purple", "orange"].map((color) => (
                      <div key={color} className="filter-option">
                        <input
                          type="checkbox"
                          id={`filter-${color}`}
                          checked={activeFilters[color]}
                          onChange={() => toggleFilter(color)}
                        />
                        <label htmlFor={`filter-${color}`} className={`filter-label ${color}`}>
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Month navigation */}
              <div className="jadwal-month-navigation">
                <div className="jadwal-month-controls">
                  <div
                    className="jadwal-month-selector"
                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                    ref={monthDropdownRef}
                  >
                    <Calendar size={18} />
                    <span>{currentMonth}</span>
                    <ChevronDown size={16} />
                    {showMonthDropdown && (
                      <div className="month-dropdown-calendar">
                        <div className="month-dropdown-years">
                          {generateMiniCalendar().years.map((year) => (
                            <button
                              key={year}
                              className={`year-button ${year === currentDate.getFullYear() ? "active" : ""}`}
                              onClick={() => handleYearSelect(year)}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                        <div className="month-grid">
                          {generateMiniCalendar().calendarRows.map((row, i) => (
                            <div key={i} className="month-row">
                              {row.map((item) => (
                                <button
                                  key={item.month}
                                  className={`month-button ${item.index === currentDate.getMonth() ? "active" : ""}`}
                                  onClick={() => handleMonthSelect(item.index)}
                                >
                                  {item.month.slice(0, 3)}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="jadwal-navigation-arrows">
                    <button className="nav-button" onClick={handlePrevious}>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="jadwal-today-button" onClick={handleToday}>
                      Today
                    </button>
                    <button className="nav-button" onClick={handleNext}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Views */}
              {view === "Monthly" && renderMonthlyView()}
              {view === "Weekly" && renderWeeklyView()}
              {view === "Daily" && renderDailyView()}

              {/* Event Form Modal */}
              {showEventForm && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <div className="modal-header">
                      <h2 className="modal-title">Add Event</h2>
                      <button className="modal-close-btn" onClick={() => setShowEventForm(false)}>
                        <X size={16} />
                      </button>
                    </div>
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="event-title">
                        Title:
                      </label>
                      <input
                        id="event-title"
                        type="text"
                        className="modal-input"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div className="modal-field">
                      <label className="modal-label" htmlFor="event-time">
                        Time (optional):
                      </label>
                      <input
                        id="event-time"
                        type="text"
                        className="modal-input"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        placeholder="HH:MM - HH:MM (e.g., 09:00 - 10:30)"
                      />
                      {timeError && <div className="error-text">{timeError}</div>}
                    </div>
                    <div className="color-options">
                      {["red", "yellow", "green", "purple", "orange"].map((color) => (
                        <button
                          key={color}
                          className={`color-option ${color} ${newEvent.color === color ? "selected" : ""}`}
                          onClick={() => setNewEvent({ ...newEvent, color })}
                        />
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button className="modal-cancel-btn" onClick={() => setShowEventForm(false)}>
                        Cancel
                      </button>
                      <button className="modal-save-btn" onClick={handleSaveEvent}>
                        Save Event
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  )
}
