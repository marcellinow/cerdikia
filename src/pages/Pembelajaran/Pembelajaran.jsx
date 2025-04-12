"use client"

import { useState, useEffect } from "react"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import "./Pembelajaran.css"
import {
  ArrowDownAZ,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
  Clock,
  Users,
  ChevronRight,
  Search,
  BookOpenCheck,
} from "lucide-react"
import { db } from "../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export default function Pembelajaran() {
  const [subjects, setSubjects] = useState([])
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortState, setSortState] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Ambil data subjects dari Firestore
        const querySnapshot = await getDocs(collection(db, "subjects"))
        const subjectsData = querySnapshot.docs.map((doc) => doc.data())

        // Filter hanya untuk PKN
        const pknSubject = subjectsData.filter(
          (subject) => subject.subjectName === "Pendidikan Pancasila dan Kewarganegaraan",
        )

        console.log("PKN Subject fetched:", pknSubject)

        // Add some sample data for better UI demonstration
        const enhancedSubjects = pknSubject.map((subject) => ({
          ...subject,
          description: "Materi pembelajaran tentang Pancasila dan kewarganegaraan untuk siswa",
          students: Math.floor(Math.random() * 1000) + 100,
          duration: `${Math.floor(Math.random() * 10) + 2} jam`,
        }))

        setSubjects(enhancedSubjects)
        setFilteredSubjects(enhancedSubjects)
      } catch (error) {
        console.error("Gagal mengambil data subjects:", error)
      }
    }

    fetchSubjects()
  }, [])

  // Filter subjects based on search query and category
  useEffect(() => {
    let result = [...subjects]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((subject) => subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((subject) => subject.category === selectedCategory)
    }

    setFilteredSubjects(result)
  }, [searchQuery, selectedCategory, subjects])

  // Sort subjects based on sortState
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (sortState === 1) {
      return a.subjectName.localeCompare(b.subjectName)
    } else if (sortState === 2) {
      return b.subjectName.localeCompare(a.subjectName)
    }
    return 0
  })

  // Toggle sort state
  const toggleSort = () => {
    setSortState((prev) => (prev + 1) % 3)
  }

  // Filter modal component
  const FilterModal = () => (
    <div className="filter-modal-overlay" onClick={() => setIsFilterOpen(false)}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <h3 className="filter-modal-title">Filter Pembelajaran</h3>
          <button className="filter-modal-close" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="filter-modal-content">
          <div className="filter-section">
            <h4 className="filter-section-title">Kategori</h4>
            <div className="filter-options">
              <button
                className={`filter-option ${selectedCategory === null ? "filter-option-active" : ""}`}
                onClick={() => setSelectedCategory(null)}
              >
                Semua
              </button>
              <button
                className={`filter-option ${selectedCategory === "SD" ? "filter-option-active" : ""}`}
                onClick={() => setSelectedCategory("SD")}
              >
                SD
              </button>
              <button
                className={`filter-option ${selectedCategory === "SMP" ? "filter-option-active" : ""}`}
                onClick={() => setSelectedCategory("SMP")}
              >
                SMP
              </button>
              <button
                className={`filter-option ${selectedCategory === "SMA" ? "filter-option-active" : ""}`}
                onClick={() => setSelectedCategory("SMA")}
              >
                SMA
              </button>
            </div>
          </div>
        </div>
        <div className="filter-modal-footer">
          <button
            className="filter-modal-button filter-modal-button-secondary"
            onClick={() => {
              setSelectedCategory(null)
              setIsFilterOpen(false)
            }}
          >
            Reset
          </button>
          <button className="filter-modal-button filter-modal-button-primary" onClick={() => setIsFilterOpen(false)}>
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="pembelajaran-container">
        <Header />
        <main className="pembelajaran-main">
          <div className="pembelajaran-header">
            <div className="pembelajaran-title-section">
              <h1 className="pembelajaran-title">Pembelajaran</h1>
              <p className="pembelajaran-subtitle">Jelajahi materi pembelajaran yang tersedia</p>
            </div>
            <div className="pembelajaran-actions">
              {/* Search Input */}
              <div className="search-bar-container" style={{ maxWidth: "240px" }}>
                <div className="search-bar-wrapper">
                  <Search className="search-bar-icon" />
                  <input
                    type="text"
                    placeholder="Cari materi..."
                    className="search-bar-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Sort Button */}
              <button
                className={`pembelajaran-button ${sortState > 0 ? "pembelajaran-button-active" : ""}`}
                onClick={toggleSort}
              >
                <ArrowDownAZ className="pembelajaran-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pembelajaran-icon" />}
                {sortState === 2 && <ChevronDown className="pembelajaran-icon" />}
              </button>

              {/* Filter Button */}
              <button
                className={`pembelajaran-button ${selectedCategory ? "pembelajaran-button-active" : ""}`}
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pembelajaran-icon" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Subject Grid */}
          {sortedSubjects.length > 0 ? (
            <div className="pembelajaran-grid">
              {sortedSubjects.map((subject) => (
                <div
                  key={subject.subjectId}
                  className="pembelajaran-card"
                  onClick={() => navigate(subject.subjectPath)}
                >
                  <div className="pembelajaran-card-image">
                    <img
                      src={subject.subjectImage || "/placeholder.svg?height=180&width=320"}
                      alt={subject.subjectName}
                    />
                    <div className="pembelajaran-card-badge">{subject.moduleCount} Modul</div>
                  </div>
                  <div className="pembelajaran-card-content">
                    <h3 className="pembelajaran-card-title">{subject.subjectName}</h3>
                    <p className="pembelajaran-card-description">{subject.description}</p>
                    <div className="pembelajaran-card-footer">
                      <div className="pembelajaran-card-stats">
                        <div className="pembelajaran-card-stat">
                          <Users size={14} />
                          <span>{subject.students}</span>
                        </div>
                        <div className="pembelajaran-card-stat">
                          <Clock size={14} />
                          <span>{subject.duration}</span>
                        </div>
                      </div>
                      <div className="pembelajaran-card-action">
                        <span>Lihat</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pembelajaran-empty">
              <BookOpenCheck className="pembelajaran-empty-icon" />
              <h3 className="pembelajaran-empty-title">Tidak ada materi ditemukan</h3>
              <p className="pembelajaran-empty-description">
                Materi yang Anda cari tidak ditemukan. Coba gunakan kata kunci lain atau reset filter.
              </p>
              <button
                className="pembelajaran-empty-button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </main>

        {/* Filter Modal */}
        {isFilterOpen && <FilterModal />}
      </div>
    </Layout>
  )
}
