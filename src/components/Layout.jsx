import React from "react";
import SideBar from "./SideBar"; // Corrected the import path for SideBar
import "./Layout.css"; // Import file CSS

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <SideBar className="sidebar" />
      {/* Main Content */}
      <div className="main-content">{children}</div>
    </div>
  );
}
