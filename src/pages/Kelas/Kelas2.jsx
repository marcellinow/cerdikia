import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import "./Kelas.css";
import PPKN from "../../assets/Img/PPKN.svg";
import BINDO from "../../assets/Img/BINDO.svg";
import MTK from "../../assets/Img/MTK.svg";
import PJOK from "../../assets/Img/PJOK.svg";
import SENBUD from "../../assets/Img/SENBUD.svg";
import BING from "../../assets/Img/BING.svg";
import { ArrowDownAZ, ChevronUp, ChevronDown, Filter } from "lucide-react";

export default function Pembelajaran() {
  const subjects = [
    {
      id: 1,
      name: "Pendidikan Pancasila dan Kewarganegaraan 2 SD",
      image: PPKN,
      bgColor: "bg-orange-100",
      modules: 5,
      category: "Sosial",
    },
    {
      id: 2,
      name: "Bahasa Indonesia 2 SD",
      image: BINDO,
      bgColor: "bg-red-100",
      modules: 5,
      category: "Sosial",
    },
    {
      id: 3,
      name: "Matematika 2 SD",
      image: MTK,
      bgColor: "bg-blue-100",
      modules: 5,
      category: "Sains",
    },
    {
      id: 4,
      name: "Pendidikan Jasmani, Olahraga, dan Kesehatan 2 SD",
      image: PJOK,
      bgColor: "bg-yellow-100",
      modules: 5,
      category: "Sosial",
    },
    {
      id: 5,
      name: "Seni dan Budaya 2 SD",
      image: SENBUD,
      bgColor: "bg-purple-100",
      modules: 5,
      category: "Peminatan",
    },
    {
      id: 6,
      name: "Bahasa Inggris 2 SD",
      image: BING,
      bgColor: "bg-green-100",
      modules: 5,
      category: "Sains",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortState, setSortState] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredSubjects = subjects.filter((subject) =>
    selectedCategory ? subject.category === selectedCategory : true
  );

  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    if (sortState === 1) {
      return a.name.localeCompare(b.name);
    } else if (sortState === 2) {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <Layout>
      <div className="pembelajaran-container">
        <Header />
        <main className="pembelajaran-main">
          <div className="pembelajaran-header">
            <h1 className="pembelajaran-title">Kelas 2</h1>
            <div className="pembelajaran-actions">
              <button
                className="pembelajaran-button"
                onClick={() => setSortState((prev) => (prev + 1) % 3)}
              >
                <ArrowDownAZ className="pembelajaran-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pembelajaran-icon" />}
                {sortState === 2 && (
                  <ChevronDown className="pembelajaran-icon" />
                )}
              </button>
              <button
                className="pembelajaran-button"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pembelajaran-icon" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div className="filter-modal">
              <div className="filter-modal-content">
                <button
                  className="filter-modal-close"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="filter-modal-close-icon">✕</span>
                </button>
                <h2 className="filter-modal-title">Filter</h2>
                <div className="filter-group">
                  <label htmlFor="category-filter">Kategori:</label>
                  <select
                    id="category-filter"
                    value={selectedCategory || ""}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value || null)
                    }
                  >
                    <option value="">Semua</option>
                    {["Sains", "Sosial", "Peminatan"].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="filter-modal-apply"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}

          <div className="pembelajaran-grid">
            {sortedSubjects.map((subject) => (
              <div key={subject.id} className="pembelajaran-card">
                <div className={`pembelajaran-card-image ${subject.bgColor}`}>
                  <img
                    src={subject.image || "/placeholder.svg"}
                    alt={subject.name}
                  />
                  <div className="pembelajaran-card-badge">
                    {subject.modules} Modul
                  </div>
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
  );
}
