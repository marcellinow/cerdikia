import { useState, useEffect } from "react"
import SideBar from "./SideBar.jsx"
import "./Layout.css"

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Listen for custom event from Header component
  useEffect(() => {
    const handleMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    window.addEventListener("toggleMobileMenu", handleMenuToggle)
    return () => window.removeEventListener("toggleMobileMenu", handleMenuToggle)
  }, [isMobileMenuOpen])

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="layout-container">
      {/* Sidebar overlay for mobile */}
      <div className={`sidebar-overlay ${isMobileMenuOpen ? "open" : ""}`} onClick={handleOverlayClick} />

      {/* Sidebar */}
      <SideBar className={`sidebar ${isMobileMenuOpen ? "open" : ""}`} />

      {/* Main Content */}
      <div className="main-content">{children}</div>
    </div>
  )
}
