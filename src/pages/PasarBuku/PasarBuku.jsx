import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  Filter,
  ListFilter,
  ShoppingCart,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import "./PasarBuku.css";

export default function PasarBuku() {
  const books = [
    {
      id: 1,
      title: "Gembira Belajar IPA",
      description: "Buku IPA 1 untuk anak kelas 1 SD",
      grade: 1,
      subject: "Sains",
      publisher: "Annibuku",
      date: "2025/03/10",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 2,
      title: "Aku Suka Berkunjung",
      description: "Buku mengenai anak kecil",
      grade: null,
      subject: "Umum",
      category: "Peminatan",
      publisher: "BukuKita",
      date: "2025/03/01",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 3,
      title: "Ilmu Pengetahuan Sosial 4",
      description: "Buku IPS 4 untuk anak kelas 4 SD",
      grade: 4,
      subject: "Sosial",
      publisher: "Annibuku",
      date: "2025/03/02",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 4,
      title: "Matematika untuk Sekolah Dasar 2",
      description: "Buku matematika volume 2 untuk kelas 3",
      grade: 3,
      subject: "Sains",
      publisher: "Penerbit Litnus",
      date: "2025/03/10",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 5,
      title: "Cerita Dongeng: Putri Duyung",
      description: "Cerita putri duyung",
      grade: null,
      subject: "Umum",
      category: "Peminatan",
      publisher: "Ruangguru",
      date: "2025/03/01",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 6,
      title: "Matematika 4",
      description: "Buku matematika untuk anak kelas 4 SD",
      grade: 4,
      subject: "Sains",
      publisher: "SIBI",
      date: "2025/03/02",
      image: "/placeholder.svg?height=150&width=120",
    },
  ];

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortState, setSortState] = useState(0); // 0: default, 1: ascending, 2: descending

  // Filter books based on selected grade and subject
  const filteredBooks = books.filter((book) => {
    const gradeMatch =
      selectedGrade === "Umum"
        ? book.subject === "Umum"
        : selectedGrade
        ? book.grade === selectedGrade
        : true;

    const subjectMatch =
      selectedSubject === "Peminatan"
        ? book.category === "Peminatan"
        : selectedSubject
        ? book.subject === selectedSubject
        : true;

    return gradeMatch && subjectMatch;
  });

  // Sort books based on sortState
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortState === 1) {
      // Ascending: Umum first, then by grade
      if (a.grade === null) return -1;
      if (b.grade === null) return 1;
      return a.grade - b.grade;
    } else if (sortState === 2) {
      // Descending: By grade, Umum last
      if (a.grade === null) return 1;
      if (b.grade === null) return -1;
      return b.grade - a.grade;
    }
    return 0; // Default: no sorting
  });

  // Handle sort button click
  const handleSortClick = () => {
    setSortState((prev) => (prev + 1) % 3); // Cycle through 0 -> 1 -> 2 -> 0
  };

  return (
    <Layout>
      <div className="pasar-buku-container">
        <Header />
        <main className="pasar-buku-main">
          <div className="pasar-buku-header">
            <h1 className="pasar-buku-title">Pasar Buku</h1>
            <div className="pasar-buku-actions">
              <button className="pasar-buku-button" onClick={handleSortClick}>
                <ListFilter className="pasar-buku-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pasar-buku-icon" />}
                {sortState === 2 && <ChevronDown className="pasar-buku-icon" />}
              </button>
              <button
                className="pasar-buku-button"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pasar-buku-icon" />
                <span>Filter</span>
              </button>
              <button className="pasar-buku-button pasar-buku-cart">
                <ShoppingCart className="pasar-buku-icon" />
                <span>Keranjang Sewa</span>
              </button>
            </div>
          </div>

          {/* Filter Modal */}
          {isFilterOpen && (
            <div className="filter-modal">
              <div className="filter-modal-content">
                <button
                  className="filter-modal-close"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="filter-modal-close-icon" />
                </button>
                <h2 className="filter-modal-title">Filter Buku</h2>
                <div className="filter-group">
                  <label htmlFor="grade-filter">Kelas:</label>
                  <select
                    id="grade-filter"
                    value={selectedGrade || ""}
                    onChange={(e) =>
                      setSelectedGrade(
                        e.target.value
                          ? e.target.value === "Umum"
                            ? "Umum"
                            : parseInt(e.target.value)
                          : null
                      )
                    }
                  >
                    <option value="">Semua</option>
                    <option value="Umum">Umum</option>
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>
                        Kelas {grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="subject-filter">Jenis Buku:</label>
                  <select
                    id="subject-filter"
                    value={selectedSubject || ""}
                    onChange={(e) => setSelectedSubject(e.target.value || null)}
                  >
                    <option value="">Semua</option>
                    {["Sains", "Sosial", "Peminatan"].map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
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

          {/* Book Grid */}
          <div className="pasar-buku-grid">
            {sortedBooks.map((book) => (
              <div key={book.id} className="pasar-buku-card">
                <div className="pasar-buku-tags">
                  {book.grade && (
                    <span className="pasar-buku-tag pasar-buku-tag-grade">
                      Kelas {book.grade}
                    </span>
                  )}
                  <span className="pasar-buku-tag pasar-buku-tag-subject">
                    {book.subject}
                  </span>
                  {book.category && (
                    <span className="pasar-buku-tag pasar-buku-tag-category">
                      {book.category}
                    </span>
                  )}
                </div>

                <h2 className="pasar-buku-card-title">{book.title}</h2>
                <p className="pasar-buku-card-description">
                  {book.description}
                </p>

                <div className="pasar-buku-card-content">
                  <button className="pasar-buku-card-button">Sewa</button>
                  <div className="pasar-buku-card-image">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                    />
                  </div>
                </div>

                <div className="pasar-buku-card-footer">
                  <div className="pasar-buku-card-publisher">
                    <div className="pasar-buku-card-avatar"></div>
                    <span>{book.publisher}</span>
                  </div>
                  <span>{book.date}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
