import { Bell, Settings } from "lucide-react";

export default function UserNav() {
  return (
    <div className="flex items-center gap-4">
      <button className="text-gray-500 hover:text-gray-700">
        <Bell className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm font-medium">Siti</span>
      </div>
      <button className="text-gray-500 hover:text-gray-700">
        <Settings className="h-5 w-5" />
      </button>
    </div>
  );
}
