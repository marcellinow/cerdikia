import { Bell, Settings, ShoppingCart } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./UserNav.css";

export default function UserNav() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="user-nav-container">
      {/* Notification Button */}
      <button className="user-nav-button user-nav-notification">
        <Bell className="h-5 w-5 user-nav-notification-icon" />
      </button>

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
