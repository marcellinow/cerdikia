import { Search } from "lucide-react"
import "./SearchBar.css"

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Search className="search-bar-icon" />
        <input type="text" placeholder="Cari materi pembelajaran..." className="search-bar-input" aria-label="Search" />
        <div className="search-bar-shortcuts">
          <span className="search-bar-shortcut">⌘</span>
          <span className="search-bar-shortcut">K</span>
        </div>
      </div>
    </div>
  )
}
