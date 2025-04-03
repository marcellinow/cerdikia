import { Bell, Settings, ShoppingCart } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react"; // Import useState
import "./UserNav.css";

export default function UserNav() {
  const navigate = useNavigate(); // Initialize navigate
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notification dropdown

  const notifications = ["Notifikasi 1", "Notifikasi 2"]; // Dummy notifications

  return (
    <div className="user-nav-container">
      {/* Notification Button */}
      <button
        className="user-nav-button user-nav-notification"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle notification dropdown
      >
        <Bell className="h-5 w-5 user-nav-notification-icon" />
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification}
              </div>
            ))
          ) : (
            <div className="notification-empty">Tidak ada notifikasi</div>
          )}
        </div>
      )}

      {/* Cart Button */}
      <button
        className="user-nav-button user-nav-cart"
        onClick={() => navigate("/keranjang")} // Navigate to Keranjang page
      >
        <ShoppingCart className="h-5 w-5 user-nav-cart-icon" />
      </button>

      {/* Profile Button with Profile Picture */}
      <button
        className="user-nav-button user-nav-avatar"
        onClick={() => navigate("/profile")} // Navigate to Profile page
      >
        <img
          src="/placeholder.svg?height=32&width=32" // Replace with actual profile picture URL
          alt="Profile"
          className="user-nav-avatar-img"
        />
      </button>

      {/* Settings Button */}
      <button className="user-nav-button user-nav-settings">
        <Settings className="h-5 w-5 user-nav-settings-icon" />
      </button>
    </div>
  );
}
