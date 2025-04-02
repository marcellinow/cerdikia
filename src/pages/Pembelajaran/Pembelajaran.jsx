import Header from "../../components/Header"
import Layout from "../../components/Layout" // Import the Layout component
import { Filter, ArrowDownAZ } from "lucide-react"
import "./Pembelajaran.css" // Import the CSS file

export default function Pembelajaran() {
  // Sample data for subjects
  const subjects = [
    {
      id: 1,
      name: "Pendidikan Pancasila dan Kewarganegaraan",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-orange-100",
      modules: 5,
    },
    {
      id: 2,
      name: "Bahasa Indonesia",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-red-100",
      modules: 5,
    },
    {
      id: 3,
      name: "Matematika",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-blue-100",
      modules: 5,
    },
    {
      id: 4,
      name: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-yellow-100",
      modules: 5,
    },
    {
      id: 5,
      name: "Seni dan Budaya",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-purple-100",
      modules: 5,
    },
    {
      id: 6,
      name: "Bahasa Inggris",
      image: "/placeholder.svg?height=200&width=400",
      bgColor: "bg-green-100",
      modules: 5,
    },
  ]

  return (
    <Layout>
      <div className="pembelajaran-container">
        <Header />
        <main className="pembelajaran-main">
          <div className="pembelajaran-header">
            <h1 className="pembelajaran-title">Pembelajaran</h1>
            <div className="pembelajaran-actions">
              <button className="pembelajaran-button">
                <ArrowDownAZ size={16} />
                <span>Urutkan</span>
              </button>
              <button className="pembelajaran-button">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="pembelajaran-grid">
            {subjects.map((subject) => (
              <div key={subject.id} className="pembelajaran-card">
                <div className={`pembelajaran-card-image ${subject.bgColor}`}>
                  <img src={subject.image || "/placeholder.svg"} alt={subject.name} />
                  <div className="pembelajaran-card-badge">{subject.modules} Modul</div>
                </div>
                <div className="pembelajaran-card-content">
                  <h3 className="pembelajaran-card-title">{subject.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  )
}

