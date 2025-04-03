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
                  <h3>Gembira Belajar IPA</h3>
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
            <div className="dashboard-card dashboard-video-section">
              <h2 className="font-semibold mb-4">
                Lanjutkan Video Pembelajaran
              </h2>
              <div className="dashboard-video-container">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="dashboard-video-card">
                    <div className="dashboard-video-thumbnail">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="dashboard-video-content">
                      <h3 className="dashboard-video-title">Video {item}</h3>
                      <p className="dashboard-video-description">
                        Deskripsi singkat tentang video pembelajaran {item}.
                      </p>
                      <button className="dashboard-video-button">
                        Tonton Sekarang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            {/* Grid Container for Kurikulum Materi */}
            <div className="dashboard-curriculum-grid">
              {[
                { grade: 1, color: "bg-red-400", path: "/kelas/1" },
                { grade: 2, color: "bg-teal-400", path: "/kelas/2" },
                { grade: 3, color: "bg-teal-400", path: "/kelas/3" },
                { grade: 4, color: "bg-amber-400", path: "/kelas/4" },
                { grade: 5, color: "bg-teal-400", path: "/kelas/5" },
                { grade: 6, color: "bg-amber-400", path: "/kelas/6" },
                {
                  name: "Ekstrakurikuler",
                  icon: "🎓",
                  path: "/ekstrakurikuler",
                },
                { name: "Peminatan", icon: "🎓", path: "/peminatan" },
              ].map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="dashboard-curriculum-card"
                >
                  {item.grade ? (
                    <>
                      <div
                        className={`${item.color} h-24 w-24 rounded-lg flex items-center justify-center mb-4`}
                      >
                        <span className="text-4xl font-bold text-white">
                          {item.grade}
                        </span>
                      </div>
                      <span className="font-medium">Kelas {item.grade}</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-100 h-24 w-24 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-2xl">{item.icon}</span>
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
