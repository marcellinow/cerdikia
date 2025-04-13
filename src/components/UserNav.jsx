import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, Settings, ShoppingCart, User, LogOut, Heart, HelpCircle, BookOpen, CheckCircle } from "lucide-react"
import { getAuth, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import "./UserNav.css"

export default function UserNav() {
  const navigate = useNavigate()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)
  const auth = getAuth()

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser
        if (user) {
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            setUserData(userSnap.data())
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

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

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
      alert("Gagal keluar. Silakan coba lagi.")
    }
  }

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
        <img src={userData?.photoURL || "/placeholder.svg?height=40&width=40"} alt="Profile" className="user-nav-avatar-img" />
      </div>

      {/* User Menu Dropdown */}
      {isUserMenuOpen && (
        <div className="user-dropdown" ref={userMenuRef}>
          <div className="user-dropdown-header">
            <div className="user-dropdown-avatar">
              <img src={userData?.photoURL || "/placeholder.svg?height=64&width=64"} alt="Profile" />
            </div>
            <div className="user-dropdown-name">{userData?.name || "Pengguna"}</div>
            <div className="user-dropdown-email">{userData?.email || "user@example.com"}</div>
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

            <div className="user-dropdown-item user-dropdown-logout" onClick={handleLogout}>
              <LogOut className="user-dropdown-item-icon" />
              <span>Keluar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
