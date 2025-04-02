import { Search } from "lucide-react";
import "./SearchBar.css"; // Import file CSS

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Search className="search-bar-icon" />
        <input
          type="text"
          placeholder="Pencarian"
          className="search-bar-input"
        />
      </div>
      <div className="search-bar-shortcuts">
        <span className="search-bar-shortcut">⌘</span>
        <span className="search-bar-shortcut">F</span>
      </div>
    </div>
  );
}
