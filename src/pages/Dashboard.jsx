import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header"; // Ganti dengan path ke komponen Header Anda

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 bg-[#FDF8F3]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#3A3A3A]">
            Selamat Datang, <span className="text-[#FF6B35]">Siti</span>!
          </h1>
          <p className="text-gray-500">kata-kata hari ini!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Trending Buku */}
          <Link to="/pasar-buku" className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-1">
              Lihat Trending Buku Hari Ini!
            </h2>
            <p className="text-xs text-gray-500 mb-4">Klik di bawah</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-sm">Why? The Sea Laut</h3>
              </div>
              <div className="w-24 h-32 bg-blue-100 rounded flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=128&width=96"
                  alt="Book cover"
                  className="h-full w-full object-cover rounded"
                />
              </div>
            </div>
          </Link>

          {/* Video Pembelajaran */}
          <Link to="/pembelajaran" className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">Lanjutkan Video Pembelajaran</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="relative h-20 bg-blue-100 rounded overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </Link>

          {/* Calendar */}
          <Link to="/jadwal" className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ChevronLeft className="h-5 w-5 text-gray-500" />
              <h2 className="font-semibold">Maret 2025</h2>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-xs grid grid-cols-7 gap-1">
              {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map((day) => (
                <div key={day} className="text-center font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-center p-1 rounded-full ${
                    i === 9 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* Kurikulum Materi */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Kurikulum Materi</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Semua</span>
              <button className="p-1 rounded-full bg-gray-100">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { grade: 1, color: "bg-red-400" },
              { grade: 2, color: "bg-teal-400" },
              { grade: 3, color: "bg-teal-400" },
              { grade: 4, color: "bg-amber-400" },
              { grade: 5, color: "bg-teal-400" },
              { grade: 6, color: "bg-amber-400" },
              { name: "Ekstrakurikuler", icon: "grid" },
              { name: "Peminatan", icon: "grid" },
            ].map((item, index) => (
              <Link
                to={
                  item.grade
                    ? `/kelas/${item.grade}`
                    : `/${item.name.toLowerCase()}`
                }
                key={index}
                className="border rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                {item.grade ? (
                  <>
                    <div
                      className={`${item.color} h-32 w-32 rounded-lg flex items-center justify-center mb-4`}
                    >
                      <span className="text-6xl font-bold text-white">
                        {item.grade}
                      </span>
                    </div>
                    <span className="font-medium">Kelas {item.grade}</span>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-100 h-32 w-32 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-4xl">🎓</span>
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
