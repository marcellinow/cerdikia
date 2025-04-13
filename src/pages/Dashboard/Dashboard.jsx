"use client"

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
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react"

import Header from "../../components/Header"
import Layout from "../../components/Layout"
import "./Dashboard.css" // Import the CSS file

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            setUserData(userSnap.data())
          } else {
            // If no Firestore data, use auth data as fallback
            setUserData({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: "Guru",
            })
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
      progress: 65,
    },
    {
      id: 2,
      title: "Membaca dengan Lancar",
      description: "Teknik membaca yang efektif untuk anak",
      duration: "20 menit",
      color: "bg-gradient-2",
      icon: "📚",
      progress: 30,
    },
    {
      id: 3,
      title: "Mengenal Alam Sekitar",
      description: "Eksplorasi lingkungan dan alam sekitar kita",
      duration: "18 menit",
      color: "bg-gradient-3",
      icon: "🌿",
      progress: 80,
    },
  ]

  const achievements = [
    { title: "Kursus Selesai", value: "12", icon: <BookOpenCheck className="h-5 w-5" />, change: "+2" },
    { title: "Jam Belajar", value: "48", icon: <Clock className="h-5 w-5" />, change: "+5" },
    { title: "Pencapaian", value: "5", icon: <Star className="h-5 w-5" />, change: "+1" },
  ]

  const recommendedBooks = [
    {
      title: "Matematika Kelas 4",
      description: "Belajar matematika dengan mudah",
      icon: "📘",
      color: "bg-gradient-1",
    },
    {
      title: "Eksperimen Sains",
      description: "Eksperimen sains sederhana",
      icon: "🧪",
      color: "bg-gradient-2",
    },
    {
      title: "Bahasa Indonesia",
      description: "Meningkatkan kemampuan berbahasa",
      icon: "📝",
      color: "bg-gradient-3",
    },
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Layout>
      <div className="dashboard-container">
        <Header />
        <main className="dashboard-main">
          {/* Hero Section */}
          <div className="dashboard-hero">
            <div className="hero-content">
              <div className="welcome-badge">
                <Sparkles className="h-4 w-4 mr-1" />
                <span>Selamat Datang Kembali</span>
              </div>
              <h1 className="hero-title">
                Halo, <span className="highlight">{userData?.name || "Pengguna"}</span>!
              </h1>
              <p className="hero-subtitle">
                Mari lanjutkan perjalanan belajarmu hari ini dengan materi yang menyenangkan
              </p>

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
                      <div className="achievement-header">
                        <h3 className="achievement-value">{item.value}</h3>
                        {item.change && <span className="achievement-change">{item.change}</span>}
                      </div>
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
              <div className="decoration-element element-4"></div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Main Content */}
            <div className="dashboard-content">
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
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${video.progress}%` }}></div>
                          </div>
                          <span className="progress-text">{video.progress}%</span>
                        </div>
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
                      <div className="book-badge">Populer</div>
                      <img src="/books/buku1.svg" alt="Book cover" />
                    </div>
                    <div className="book-info">
                      <h3 className="book-title">Gembira Belajar IPA</h3>
                      <p className="book-description">
                        Pelajari konsep IPA dengan cara yang menyenangkan dan interaktif untuk meningkatkan pemahaman
                        anak
                      </p>
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
                      {recommendedBooks.map((book, index) => (
                        <div className="book-item" key={index}>
                          <div className={`book-item-cover ${book.color}`}>
                            <span>{book.icon}</span>
                          </div>
                          <div className="book-item-info">
                            <h4>{book.title}</h4>
                            <p>{book.description}</p>
                          </div>
                          <ArrowRight className="book-item-arrow h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="dashboard-sidebar">
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
                    <div className="events-header">
                      <h3 className="events-title">Kegiatan Hari Ini</h3>
                      <span className="events-date">10 Maret 2025</span>
                    </div>
                    <div className="event-list">
                      <div className="event-item">
                        <div className="event-time">09:00</div>
                        <div className="event-content">
                          <div className="event-indicator"></div>
                          <div>
                            <h4 className="event-name">Kelas Matematika</h4>
                            <p className="event-description">Belajar perkalian dan pembagian</p>
                          </div>
                        </div>
                      </div>
                      <div className="event-item">
                        <div className="event-time">13:30</div>
                        <div className="event-content">
                          <div className="event-indicator"></div>
                          <div>
                            <h4 className="event-name">Praktikum IPA</h4>
                            <p className="event-description">Eksperimen fotosintesis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <div className="section-title">
                    <BarChart3 className="section-icon" />
                    <h2>Statistik Belajar</h2>
                  </div>
                </div>

                <div className="stats-container">
                  <div className="stats-item">
                    <div className="stats-info">
                      <h3>Waktu Belajar Minggu Ini</h3>
                      <p className="stats-value">8 jam 30 menit</p>
                    </div>
                    <div className="stats-chart">
                      <div className="chart-bar-container">
                        {[30, 45, 60, 40, 75, 50, 20].map((value, index) => (
                          <div className="chart-bar-wrapper" key={index}>
                            <div className="chart-bar" style={{ height: `${value}%` }}></div>
                            <span className="chart-label">{["S", "S", "R", "K", "J", "S", "M"][index]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="stats-item">
                    <div className="stats-info">
                      <h3>Materi Selesai</h3>
                      <div className="completion-info">
                        <p className="stats-value">24/36</p>
                        <span className="completion-percentage">67%</span>
                      </div>
                    </div>
                    <div className="completion-bar">
                      <div className="completion-fill" style={{ width: "67%" }}></div>
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
                <button
                  className={`filter-button ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => handleTabChange("all")}
                >
                  Semua
                </button>
                <button
                  className={`filter-button ${activeTab === "favorite" ? "active" : ""}`}
                  onClick={() => handleTabChange("favorite")}
                >
                  Favorit
                </button>
                <button
                  className={`filter-button ${activeTab === "new" ? "active" : ""}`}
                  onClick={() => handleTabChange("new")}
                >
                  Terbaru
                </button>
              </div>
            </div>

            <div className="curriculum-grid">
              {[
                { grade: 1, color: "bg-gradient-1", path: "/kelas/1", students: "1.2k" },
                { grade: 2, color: "bg-gradient-2", path: "/kelas/2", students: "980" },
                { grade: 3, color: "bg-gradient-3", path: "/kelas/3", students: "1.5k" },
                { grade: 4, color: "bg-gradient-4", path: "/kelas/4", students: "1.1k" },
                { grade: 5, color: "bg-gradient-5", path: "/kelas/5", students: "950" },
                { grade: 6, color: "bg-gradient-6", path: "/kelas/6", students: "870" },
                {
                  name: "Ekstrakurikuler",
                  icon: "🎓",
                  path: "/ekstrakurikuler",
                  color: "bg-gradient-7",
                  students: "760",
                },
                { name: "Peminatan", icon: "🎯", path: "/peminatan", color: "bg-gradient-8", students: "620" },
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
                        <div className="curriculum-meta">
                          <span className="curriculum-students">
                            <GraduationCap className="h-4 w-4" />
                            {item.students} Siswa
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="curriculum-icon-wrapper">
                          <span className="curriculum-icon">{item.icon}</span>
                        </div>
                        <h3 className="curriculum-title">{item.name}</h3>
                        <p className="curriculum-description">Program khusus {item.name.toLowerCase()}</p>
                        <div className="curriculum-meta">
                          <span className="curriculum-students">
                            <GraduationCap className="h-4 w-4" />
                            {item.students} Siswa
                          </span>
                        </div>
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
