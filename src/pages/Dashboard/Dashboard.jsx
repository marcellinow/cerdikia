import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase"
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  BookOpenCheck,
  GraduationCap,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react"

import Header from "../../components/Header"
import Layout from "../../components/Layout"
import "./Dashboard.css" // Import the CSS file

export default function Dashboard() {
  const [displayName, setDisplayName] = useState("Pengguna")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            setDisplayName(data.name || data.displayName || "Pengguna")
          }
        } catch (err) {
          console.error("Gagal mengambil data pengguna:", err)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  const videoLessons = [
    {
      id: 1,
      title: "Pengenalan Matematika Dasar",
      description: "Belajar konsep dasar matematika untuk pemula",
      duration: "15 menit",
      color: "bg-gradient-1",
      icon: "📐",
    },
    {
      id: 2,
      title: "Membaca dengan Lancar",
      description: "Teknik membaca yang efektif untuk anak",
      duration: "20 menit",
      color: "bg-gradient-2",
      icon: "📚",
    },
    {
      id: 3,
      title: "Mengenal Alam Sekitar",
      description: "Eksplorasi lingkungan dan alam sekitar kita",
      duration: "18 menit",
      color: "bg-gradient-3",
      icon: "🌿",
    },
  ]

  const achievements = [
    { title: "Kursus Selesai", value: "12", icon: <BookOpenCheck className="h-5 w-5" /> },
    { title: "Jam Belajar", value: "48", icon: <Clock className="h-5 w-5" /> },
    { title: "Pencapaian", value: "5", icon: <Star className="h-5 w-5" /> },
  ]

  return (
    <Layout>
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-main">
          {/* Hero Section */}
          <div className="dashboard-hero">
            <div className="hero-content">
              <h1 className="hero-title">
                Selamat Datang, <span className="highlight">{displayName}</span>!
              </h1>
              <p className="hero-subtitle">Setiap orang bisa belajar dengan cara yang menyenangkan</p>

              <div className="hero-search">
                <Search className="search-icon" />
                <input type="text" placeholder="Cari materi pembelajaran..." className="search-input" />
                <button className="search-button">Cari</button>
              </div>

              <div className="achievement-cards">
                {achievements.map((item, index) => (
                  <div className="achievement-card" key={index}>
                    <div className="achievement-icon">{item.icon}</div>
                    <div className="achievement-info">
                      <h3 className="achievement-value">{item.value}</h3>
                      <p className="achievement-title">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-decoration">
              <div className="decoration-element element-1"></div>
              <div className="decoration-element element-2"></div>
              <div className="decoration-element element-3"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-content">
            <div className="content-section">
              <div className="section-header">
                <div className="section-title">
                  <TrendingUp className="section-icon" />
                  <h2>Trending Buku</h2>
                </div>
                <Link to="/pasar-buku" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="trending-book-container">
                <div className="trending-book-card">
                  <div className="book-cover">
                    <img src="/placeholder.svg?height=180&width=120" alt="Book cover" />
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">Gembira Belajar IPA</h3>
                    <p className="book-description">Pelajari konsep IPA dengan cara yang menyenangkan dan interaktif</p>
                    <div className="book-meta">
                      <span className="book-rating">
                        <Star className="h-4 w-4 fill-current" />
                        4.8
                      </span>
                      <span className="book-students">
                        <GraduationCap className="h-4 w-4" />
                        1.2k Siswa
                      </span>
                    </div>
                    <button className="book-action">Baca Sekarang</button>
                  </div>
                </div>

                <div className="recommended-books">
                  <h3 className="recommended-title">Rekomendasi Untukmu</h3>
                  <div className="book-list">
                    <div className="book-item">
                      <div className="book-item-cover bg-gradient-1">
                        <span>📘</span>
                      </div>
                      <div className="book-item-info">
                        <h4>Matematika Kelas 4</h4>
                        <p>Belajar matematika dengan mudah</p>
                      </div>
                    </div>
                    <div className="book-item">
                      <div className="book-item-cover bg-gradient-2">
                        <span>🧪</span>
                      </div>
                      <div className="book-item-info">
                        <h4>Eksperimen Sains</h4>
                        <p>Eksperimen sains sederhana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-section">
              <div className="section-header">
                <div className="section-title">
                  <Play className="section-icon" />
                  <h2>Lanjutkan Pembelajaran</h2>
                </div>
                <Link to="/video" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="video-lessons-container">
                {videoLessons.map((video) => (
                  <div key={video.id} className="video-lesson-card">
                    <div className={`video-thumbnail ${video.color}`}>
                      <span className="video-icon">{video.icon}</span>
                      <div className="play-button">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{video.title}</h3>
                      <p className="video-description">{video.description}</p>
                      <div className="video-meta">
                        <span className="video-duration">
                          <Clock className="h-4 w-4" />
                          {video.duration}
                        </span>
                        <button className="video-action">Lanjutkan</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-section">
              <div className="section-header">
                <div className="section-title">
                  <Calendar className="section-icon" />
                  <h2>Jadwal Kegiatan</h2>
                </div>
                <Link to="/jadwal" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="calendar-container">
                <div className="calendar-header">
                  <button className="calendar-nav-button">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h3 className="calendar-month">Maret 2025</h3>
                  <button className="calendar-nav-button">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="calendar-grid">
                  {["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"].map((day) => (
                    <div key={day} className="calendar-day">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className={`calendar-date ${i === 9 ? "active" : ""} ${[5, 12, 19].includes(i) ? "has-event" : ""}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div className="upcoming-events">
                  <h3 className="events-title">Kegiatan Hari Ini</h3>
                  <div className="event-list">
                    <div className="event-item">
                      <div className="event-time">09:00</div>
                      <div className="event-content">
                        <h4 className="event-name">Kelas Matematika</h4>
                        <p className="event-description">Belajar perkalian dan pembagian</p>
                      </div>
                    </div>
                    <div className="event-item">
                      <div className="event-time">13:30</div>
                      <div className="event-content">
                        <h4 className="event-name">Praktikum IPA</h4>
                        <p className="event-description">Eksperimen fotosintesis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kurikulum Materi */}
          <div className="curriculum-section">
            <div className="curriculum-header">
              <div className="section-title">
                <BookOpenCheck className="section-icon" />
                <h2>Kurikulum Materi</h2>
              </div>
              <div className="curriculum-filter">
                <span className="filter-label">Filter:</span>
                <button className="filter-button active">Semua</button>
                <button className="filter-button">Favorit</button>
                <button className="filter-button">Terbaru</button>
              </div>
            </div>

            <div className="curriculum-grid">
              {[
                { grade: 1, color: "bg-gradient-1", path: "/kelas/1" },
                { grade: 2, color: "bg-gradient-2", path: "/kelas/2" },
                { grade: 3, color: "bg-gradient-3", path: "/kelas/3" },
                { grade: 4, color: "bg-gradient-4", path: "/kelas/4" },
                { grade: 5, color: "bg-gradient-5", path: "/kelas/5" },
                { grade: 6, color: "bg-gradient-6", path: "/kelas/6" },
                { name: "Ekstrakurikuler", icon: "🎓", path: "/ekstrakurikuler", color: "bg-gradient-7" },
                { name: "Peminatan", icon: "🎯", path: "/peminatan", color: "bg-gradient-8" },
              ].map((item, index) => (
                <Link to={item.path} key={index} className="curriculum-card">
                  <div className={`curriculum-card-inner ${item.color}`}>
                    {item.grade ? (
                      <>
                        <div className="curriculum-icon-wrapper">
                          <span className="curriculum-grade">{item.grade}</span>
                        </div>
                        <h3 className="curriculum-title">Kelas {item.grade}</h3>
                        <p className="curriculum-description">Materi pembelajaran kelas {item.grade}</p>
                      </>
                    ) : (
                      <>
                        <div className="curriculum-icon-wrapper">
                          <span className="curriculum-icon">{item.icon}</span>
                        </div>
                        <h3 className="curriculum-title">{item.name}</h3>
                        <p className="curriculum-description">Program khusus {item.name.toLowerCase()}</p>
                      </>
                    )}
                    <div className="curriculum-card-action">
                      <span>Lihat Materi</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
