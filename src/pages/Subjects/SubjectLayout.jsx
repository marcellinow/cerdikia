import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import { Search, ChevronLeft, Book, Clock, FileText, ChevronRight, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "./SubjectLayout.css"
import subjects from "../../data/Subjects/subjects"
import modules from "../../data/Modul/modules"

export default function SubjectLayout({ title, subtitle, grade, pelajaran }) {
  const [filteredModules, setFilteredModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchModules = () => {
      try {
        console.log("Grade:", grade, "Pelajaran:", pelajaran)

        const subject = subjects.find((subj) => subj.classId === grade && subj.subjectName === pelajaran)

        if (!subject) {
          console.error("Subject not found")
          setFilteredModules([])
          return
        }

        // Filter modules based on moduleIds from the subject
        const modulesForSubject = modules.filter((module) => subject.moduleIds.includes(module.moduleId))

        // Log the filtered modules to ensure they are fetched correctly
        console.log("Filtered Modules:", modulesForSubject)

        setFilteredModules(modulesForSubject)
      } catch (error) {
        console.error("Error fetching modules:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [grade, pelajaran])

  // Filter modules based on search query
  const displayedModules = searchQuery
    ? filteredModules.filter(
        (module) =>
          module.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.moduleDescription.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredModules

  return (
    <Layout>
      <div className="subject-container">
        <Header />
        <main className="subject-main">
          <div className="subject-header">
            <button className="subject-back-button" onClick={() => navigate(-1)}>
              <ChevronLeft className="subject-back-icon" />
              <span>Kembali</span>
            </button>

            <div className="subject-title-section">
              <h1 className="subject-title">{title}</h1>
              <p className="subject-subtitle">{subtitle}</p>
            </div>

            <div className="subject-actions">
              {showSearch ? (
                <div className="subject-search-container">
                  <Search className="subject-search-icon" />
                  <input
                    type="text"
                    placeholder="Cari modul..."
                    className="subject-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button className="subject-search-close" onClick={() => setShowSearch(false)}>
                    <ChevronLeft className="subject-search-close-icon" />
                  </button>
                </div>
              ) : (
                <button className="subject-search-button" onClick={() => setShowSearch(true)}>
                  <Search className="subject-search-button-icon" />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="subject-loading">
              <Loader2 className="subject-loading-icon animate-spin" />
              <p>Memuat modul pembelajaran...</p>
            </div>
          ) : displayedModules.length > 0 ? (
            <div className="subject-grid">
              {displayedModules.map((module) => (
                <a
                  href={`/kelas/${module.gradeLevel}/module/${module.moduleId}`}
                  key={module.moduleId}
                  className="subject-card"
                >
                  <div className="subject-card-image">
                    <img
                      src={module.image || "/placeholder.svg?height=200&width=300"}
                      alt={module.moduleTitle}
                      className="subject-card-img"
                    />
                    <div className="subject-card-icon">
                      <Book className="icon" />
                    </div>
                  </div>
                  <div className="subject-card-content">
                    <h3 className="subject-card-title">{module.moduleTitle}</h3>
                    <p className="subject-card-description">{module.moduleDescription}</p>
                    <div className="subject-card-meta">
                      <div className="subject-card-stat">
                        <FileText className="subject-card-stat-icon" />
                        <span>{module.totalPages} halaman</span>
                      </div>
                      <div className="subject-card-stat">
                        <Clock className="subject-card-stat-icon" />
                        <span>{module.estimatedTime || "15 menit"}</span>
                      </div>
                    </div>
                    <div className="subject-card-action">
                      <span>Baca Modul</span>
                      <ChevronRight className="subject-card-action-icon" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="subject-empty">
              <Book className="subject-empty-icon" />
              <h3 className="subject-empty-title">Tidak ada modul ditemukan</h3>
              <p className="subject-empty-description">
                {searchQuery
                  ? "Tidak ada modul yang sesuai dengan pencarian Anda. Coba kata kunci lain."
                  : "Belum ada modul yang tersedia untuk mata pelajaran ini."}
              </p>
              {searchQuery && (
                <button className="subject-empty-button" onClick={() => setSearchQuery("")}>
                  Reset Pencarian
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}
