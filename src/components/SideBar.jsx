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

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: Clock, path: "/" },
    { name: "Kelas", icon: GraduationCap, path: "/kelas" },
    { name: "Pembelajaran", icon: BookOpen, path: "/pembelajaran" },
    { name: "Pasar Buku", icon: BookMarked, path: "/pasar-buku" },
    { name: "Jadwal", icon: Calendar, path: "/jadwal" },
    { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
  ];

  return (
    <div className="w-[215px] min-h-screen border-r bg-white">
      <div className="p-4 border-b">
        <NavLink to="/">
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=50&width=120"
              alt="Cerdikia Logo"
              className="h-12"
            />
          </div>
        </NavLink>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
