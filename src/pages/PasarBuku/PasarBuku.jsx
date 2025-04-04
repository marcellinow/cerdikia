import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  ArrowDownAZ,
  Filter,
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
      category: "Sains",
      publisher: "Annibuku",
      date: "2025/03/10",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 2,
      title: "Aku Suka Berkunjung",
      description: "Buku mengenai anak kecil",
      grade: 0,
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
      category: "Sosial",
      publisher: "Annibuku",
      date: "2025/03/02",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 4,
      title: "Matematika untuk Sekolah Dasar 2",
      description: "Buku matematika volume 2 untuk kelas 3",
      grade: 3,
      category: "Sains",
      publisher: "Penerbit Litnus",
      date: "2025/03/10",
      image: "/placeholder.svg?height=150&width=120",
    },
    {
      id: 5,
      title: "Cerita Dongeng: Putri Duyung",
      description: "Cerita putri duyung",
      grade: 0,
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
      category: "Sains",
      publisher: "SIBI",
      date: "2025/03/02",
      image: "/placeholder.svg?height=150&width=120",
    },
  ];

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookDetailModalOpen, setIsBookDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  // Filter books based on selected grade and category
  const filteredBooks = books.filter((book) => {
    const gradeMatch =
      selectedGrade !== null ? book.grade === selectedGrade : true;
    const categoryMatch =
      selectedCategory !== null ? book.category === selectedCategory : true;
    return gradeMatch && categoryMatch;
  });

  // Sort books based on sortState
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortState === 1) {
      return a.grade - b.grade;
    } else if (sortState === 2) {
      return b.grade - a.grade;
    }
    return 0;
  });

  // Handle filter apply
  const handleApplyFilter = () => {
    setIsFilterOpen(false); // Close the filter modal
  };

  // Handle book card click
  const handleBookCardClick = (book) => {
    setSelectedBook(book);
    setIsBookDetailModalOpen(true);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setNotification("Buku Berhasil Masuk ke Keranjang!");
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    setIsBookDetailModalOpen(false); // Close modal
  };

  return (
    <Layout>
      <div className="pasar-buku-container">
        <Header />
        <main className="pasar-buku-main">
          <div className="pasar-buku-header">
            <h1 className="pasar-buku-title">Pasar Buku</h1>
            <div className="pasar-buku-actions">
              {/* Sort Button */}
              <button
                className="pasar-buku-button"
                onClick={() => setSortState((prev) => (prev + 1) % 3)}
              >
                <ArrowDownAZ className="pasar-buku-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pasar-buku-icon" />}
                {sortState === 2 && <ChevronDown className="pasar-buku-icon" />}
              </button>

              {/* Filter Button */}
              <button
                className="pasar-buku-button"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pasar-buku-icon" />
                <span>Filter</span>
              </button>

              {/* Cart Button */}
              <button
                className="pasar-buku-button pasar-buku-cart"
                onClick={() => navigate("/keranjang")}
              >
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
                    value={selectedGrade !== null ? selectedGrade : ""}
                    onChange={(e) =>
                      setSelectedGrade(
                        e.target.value !== "" ? parseInt(e.target.value) : null
                      )
                    }
                  >
                    <option value="">Semua</option>
                    <option value="0">Umum</option>
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                      <option key={grade} value={grade}>
                        Kelas {grade}
                      </option>
                    ))}
                  </select>
                </div>
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
                  onClick={handleApplyFilter}
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}

          {/* Book Grid */}
          <div className="pasar-buku-grid">
            {sortedBooks.map((book) => (
              <div
                key={book.id}
                className="pasar-buku-card"
                onClick={() => handleBookCardClick(book)}
              >
                <div className="pasar-buku-tags">
                  {book.grade > 0 && (
                    <span className="pasar-buku-tag pasar-buku-tag-grade">
                      Kelas {book.grade}
                    </span>
                  )}
                  {book.grade === 0 && (
                    <span className="pasar-buku-tag pasar-buku-tag-category">
                      Umum
                    </span>
                  )}
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
                  <div className="pasar-buku-card-image">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Book Detail Modal */}
          {isBookDetailModalOpen && selectedBook && (
            <div className="filter-modal">
              <div className="filter-modal-content">
                <button
                  className="filter-modal-close"
                  onClick={() => setIsBookDetailModalOpen(false)}
                >
                  <X className="filter-modal-close-icon" />
                </button>
                <div className="book-detail-modal">
                  <div className="book-detail-left">
                    <h2 className="book-detail-title">{selectedBook.title}</h2>
                    <p className="book-detail-description">
                      {selectedBook.description}
                    </p>
                    <p className="book-detail-publisher">
                      <strong>Penerbit:</strong> {selectedBook.publisher}
                    </p>
                    <button
                      className="filter-modal-apply"
                      onClick={handleAddToCart}
                    >
                      Masukkan ke Keranjang
                    </button>
                  </div>
                  <div className="book-detail-right">
                    <img
                      src={selectedBook.image || "/placeholder.svg"}
                      alt={selectedBook.title}
                      className="book-detail-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification */}
          {notification && (
            <div className="notification">
              <p>{notification}</p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
