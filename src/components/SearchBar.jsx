import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Pencarian"
          className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
        <span className="bg-blue-100 text-blue-800 text-xs px-1 rounded">
          ⌘
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs px-1 rounded">
          F
        </span>
      </div>
    </div>
  );
}
