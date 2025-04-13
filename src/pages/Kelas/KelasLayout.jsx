import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import { ChevronLeft, BookOpen } from "lucide-react"
import "./KelasLayout.css"

export default function KelasLayout({ title, description, subjects }) {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="kelas-container">
        <Header />
        <main className="kelas-main">
          <div className="kelas-header">
            <button className="kelas-back-button" onClick={() => navigate(-1)}>
              <ChevronLeft className="kelas-back-icon" />
              <span>Kembali</span>
            </button>
            <h1 className="kelas-title">{title}</h1>
            <p className="kelas-description">{description}</p>
          </div>

          <div className="kelas-grid">
            {subjects.map((subject) => (
              <div key={subject.subjectId} className="kelas-card" onClick={() => navigate(subject.subjectPath)}>
                <div className={`kelas-card-image ${subject.bgColor || "bg-gradient-1"}`}>
                  <div className="kelas-card-icon">
                    <BookOpen className="icon" />
                  </div>
                  <img
                    src={subject.subjectImage || "/placeholder.svg?height=200&width=300"}
                    alt={subject.subjectName}
                  />
                  <div className="kelas-card-badge">{subject.moduleCount || 0} Modul</div>
                </div>
                <div className="kelas-card-content">
                  <h3 className="kelas-card-title">{subject.subjectName}</h3>
                  {subject.description && <p className="kelas-card-description">{subject.description}</p>}
                  <div className="kelas-card-action">
                    <span>Lihat Materi</span>
                    <ChevronLeft className="kelas-action-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}
