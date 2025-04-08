import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  X,
  ArrowDownAZ,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import "./PasarBuku.css";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PasarBuku() {
  const [books, setBooks] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortState, setSortState] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookDetailModalOpen, setIsBookDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const bookData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(bookData);
      } catch (error) {
        console.error("Gagal mengambil buku:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const gradeMatch =
      selectedGrade !== null ? book.grade === selectedGrade : true;
    const categoryMatch =
      selectedCategory !== null ? book.category === selectedCategory : true;
    return gradeMatch && categoryMatch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortState === 1) return a.grade - b.grade;
    if (sortState === 2) return b.grade - a.grade;
    return 0;
  });

  return (
    <Layout>
      <div className="pasar-buku-container">
        <Header />
        <main className="pasar-buku-main">
          <div className="pasar-buku-header">
            <h1 className="pasar-buku-title">Pasar Buku</h1>
            <div className="pasar-buku-actions">
              <button
                className="pasar-buku-button"
                onClick={() => setSortState((prev) => (prev + 1) % 3)}
              >
                <ArrowDownAZ className="pasar-buku-icon" />
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

              <button
                className="pasar-buku-button pasar-buku-cart"
                onClick={() => navigate("/keranjang")}
              >
                <ShoppingCart className="pasar-buku-icon" />
                <span>Keranjang Sewa</span>
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
                  <X className="filter-modal-close-icon" />
                </button>
                <h2 className="filter-modal-title">Filter</h2>
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
                  onClick={() => setIsFilterOpen(false)}
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}

          <div className="pasar-buku-grid">
            {sortedBooks.map((book) => (
              <div
                key={book.id}
                className="pasar-buku-card"
                onClick={() => {
                  setSelectedBook(book);
                  setIsBookDetailModalOpen(true);
                }}
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
                      onClick={() => {
                        setNotification("Buku Berhasil Masuk ke Keranjang!");
                        setTimeout(() => setNotification(""), 3000);
                        setIsBookDetailModalOpen(false);
                      }}
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
