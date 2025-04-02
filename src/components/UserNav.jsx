import { Bell, Settings } from "lucide-react";
import "./UserNav.css";

export default function UserNav() {
  return (
    <div className="user-nav-container">
      <button className="user-nav-button">
        <Bell className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="user-nav-avatar">
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
        </div>
        <span className="user-nav-name">Siti</span>
      </div>
      <button className="user-nav-button">
        <Settings className="h-5 w-5" />
      </button>
    </div>
  );
}
