import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout"; // Import the Layout component
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import "./Dashboard.css"; // Import file CSS

export default function Dashboard() {
  return (
    <Layout>
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-main">
          <div className="dashboard-heading">
            <h1>
              Selamat Datang, <span>Siti</span>!
            </h1>
            <p>kata-kata hari ini!</p>
          </div>

          <div className="dashboard-grid">
            {/* Trending Buku */}
            <Link to="/pasar-buku" className="dashboard-card">
              <h2>Lihat Trending Buku Hari Ini!</h2>
              <p>Klik di bawah</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3>Why? The Sea Laut</h3>
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
            <Link to="/pembelajaran" className="dashboard-card">
              <h2>Lanjutkan Video Pembelajaran</h2>
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
            <Link to="/jadwal" className="dashboard-card dashboard-calendar">
              <div className="dashboard-calendar-header">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
                <h2>Maret 2025</h2>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
              <div className="dashboard-calendar-grid">
                {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map(
                  (day) => (
                    <div key={day} className="dashboard-calendar-day">
                      {day}
                    </div>
                  )
                )}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`dashboard-calendar-date ${
                      i === 9 ? "active" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </Link>
          </div>

          {/* Kurikulum Materi */}
          <div className="dashboard-curriculum">
            <div className="dashboard-curriculum-header">
              <h2>Kurikulum Materi</h2>
              <div className="flex items-center gap-2">
                <span>Semua</span>
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

            <div className="dashboard-curriculum-grid">
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
    </Layout>
  );
}
