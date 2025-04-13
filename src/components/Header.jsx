import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import SearchBar from "./SearchBar"
import UserNav from "./UserNav"
import "./Header.css"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add scroll event listener to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-left">
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="header-title"></h1>
      </div>
      <SearchBar />
      <div className="header-right">
        <UserNav />
      </div>
    </header>
  )
}
