import SearchBar from "./SearchBar";
import UserNav from "./UserNav";
import "./Header.css"; // Import file CSS

export default function Header() {
  return (
    <header className="header">
      <SearchBar />
      <UserNav />
    </header>
  );
}
