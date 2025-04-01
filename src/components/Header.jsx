import SearchBar from "./SearchBar";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4">
      <SearchBar />
      <UserNav />
    </header>
  );
}
