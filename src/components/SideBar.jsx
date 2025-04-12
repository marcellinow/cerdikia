import { NavLink } from "react-router-dom"
import { LayoutDashboard, BookOpen, BookMarked, Calendar, Settings, Box, Users, HelpCircle } from "lucide-react"
import cerdikiaLogo from "../assets/Img/logo-cerdikia.svg"
import "./SideBar.css"

export default function SideBar({ className }) {
  const mainMenuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Pembelajaran", icon: BookOpen, path: "/pembelajaran" },
    { name: "Pasar Buku", icon: BookMarked, path: "/pasar-buku" },
    { name: "Jadwal", icon: Calendar, path: "/jadwal" },
    { name: "AR", icon: Box, path: "/ar" },
  ]

  const secondaryMenuItems = [
    { name: "Komunitas", icon: Users, path: "/komunitas" },
    { name: "Bantuan", icon: HelpCircle, path: "/bantuan" },
    { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
  ]

  return (
    <div className={`sidebar-container ${className || ""}`}>
      <div className="sidebar-header">
        <NavLink to="/dashboard">
          <img src={cerdikiaLogo || "/placeholder.svg"} alt="Cerdikia Logo" className="logo" />
        </NavLink>
      </div>

      <div className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Menu Utama</div>
          {mainMenuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
            >
              <item.icon className="sidebar-icon" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Lainnya</div>
          {secondaryMenuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
            >
              <item.icon className="sidebar-icon" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div>Cerdikia</div>
        <div className="sidebar-version">Version 1.0.0</div>
      </div>
    </div>
  )
}
