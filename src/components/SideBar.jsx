import React from "react";
import { NavLink } from "react-router-dom";
import {
  Clock,
  BookOpen,
  GraduationCap,
  BookMarked,
  Calendar,
  Settings,
} from "lucide-react";
import cerdikiaLogo from "../assets/Img/logo-cerdikia.svg";
import "./SideBar.css";

export default function SideBar() {
  const menuItems = [
    { name: "Dashboard", icon: Clock, path: "/dashboard" },
    { name: "Pembelajaran", icon: BookOpen, path: "/pembelajaran" },
    { name: "Pasar Buku", icon: BookMarked, path: "/pasar-buku" },
    { name: "Jadwal", icon: Calendar, path: "/jadwal" },
    { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <NavLink to="/dashboard">
          <img src={cerdikiaLogo} alt="Cerdikia Logo" className="logo" />
        </NavLink>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <item.icon className="sidebar-icon" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
