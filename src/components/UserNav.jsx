import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, Settings, ShoppingCart, User, LogOut, Heart, HelpCircle, BookOpen, CheckCircle } from "lucide-react"
import "./UserNav.css"

export default function UserNav() {
  const navigate = useNavigate()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)

  // Sample notifications
  const notifications = [
    {
      id: 1,
      text: "Tugas Matematika telah dinilai",
      time: "5 menit yang lalu",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      id: 2,
      text: "Buku baru tersedia di Pasar Buku",
      time: "1 jam yang lalu",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest(".user-nav-notification")
      ) {
        setIsNotificationOpen(false)
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        !event.target.closest(".user-nav-avatar")
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="user-nav-container">
      {/* Notification Button */}
      <button
        className={`user-nav-button notification-badge ${isNotificationOpen ? "user-nav-button-active" : ""}`}
        onClick={() => {
          setIsNotificationOpen(!isNotificationOpen)
          setIsUserMenuOpen(false)
        }}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="notification-dropdown" ref={notificationRef}>
          <div className="notification-header">
            <div className="notification-title">Notifikasi</div>
            <button className="notification-clear">Tandai semua dibaca</button>
          </div>

          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <div className="notification-text">{notification.text}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="notification-empty">Tidak ada notifikasi baru</div>
            )}
          </div>

          <div className="notification-footer">
            <button className="notification-view-all" onClick={() => navigate("/notifikasi")}>
              Lihat semua notifikasi
            </button>
          </div>
        </div>
      )}

      {/* Cart Button */}
      <button className="user-nav-button" onClick={() => navigate("/keranjang")} aria-label="Shopping Cart">
        <ShoppingCart className="h-5 w-5" />
      </button>

      {/* Settings Button */}
      <button className="user-nav-button" onClick={() => navigate("/pengaturan")} aria-label="Settings">
        <Settings className="h-5 w-5" />
      </button>

      {/* Profile Button */}
      <div
        className="user-nav-avatar"
        onClick={() => {
          setIsUserMenuOpen(!isUserMenuOpen)
          setIsNotificationOpen(false)
        }}
      >
        <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="user-nav-avatar-img" />
      </div>

      {/* User Menu Dropdown */}
      {isUserMenuOpen && (
        <div className="user-dropdown" ref={userMenuRef}>
          <div className="user-dropdown-header">
            <div className="user-dropdown-avatar">
              <img src="/placeholder.svg?height=64&width=64" alt="Profile" />
            </div>
            <div className="user-dropdown-name">Nama Pengguna</div>
            <div className="user-dropdown-email">user@example.com</div>
          </div>

          <div className="user-dropdown-menu">
            <div className="user-dropdown-item" onClick={() => navigate("/profile")}>
              <User className="user-dropdown-item-icon" />
              <span>Profil Saya</span>
            </div>

            <div className="user-dropdown-item" onClick={() => navigate("/favorit")}>
              <Heart className="user-dropdown-item-icon" />
              <span>Favorit</span>
            </div>

            <div className="user-dropdown-item" onClick={() => navigate("/bantuan")}>
              <HelpCircle className="user-dropdown-item-icon" />
              <span>Bantuan</span>
            </div>

            <div className="user-dropdown-divider"></div>

            <div className="user-dropdown-item user-dropdown-logout" onClick={() => navigate("/logout")}>
              <LogOut className="user-dropdown-item-icon" />
              <span>Keluar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
