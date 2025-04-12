import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ShoppingCart,
  X,
  ArrowDownAZ,
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Book,
  Users,
  Calendar,
  BookOpen,
  CheckCircle,
} from "lucide-react"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import "./PasarBuku.css"
import { db } from "../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function PasarBuku() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortState, setSortState] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isBookDetailModalOpen, setIsBookDetailModalOpen] = useState(false)
  const [notification, setNotification] = useState({ message: "", type: "" })
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"))
        const bookData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Add sample price and rating for UI
          price: `Rp ${Math.floor(Math.random() * 50) + 20}.000`,
          rating: (Math.random() * 2 + 3).toFixed(1),
          students: Math.floor(Math.random() * 1000) + 100,
        }))
        setBooks(bookData)
        setFilteredBooks(bookData)
      } catch (error) {
        console.error("Gagal mengambil buku:", error)
      }
    }

    fetchBooks()
  }, [])

  // Filter books based on search, grade, and category
  useEffect(() => {
    let result = [...books]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply grade filter
    if (selectedGrade !== null) {
      result = result.filter((book) => book.grade === selectedGrade)
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((book) => book.category === selectedCategory)
    }

    setFilteredBooks(result)
  }, [searchQuery, selectedGrade, selectedCategory, books])

  // Sort books based on sortState
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortState === 1) return a.grade - b.grade
    if (sortState === 2) return b.grade - a.grade
    return 0
  })

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: "", type: "" }), 3000)
  }

  // Add to cart handler
  const handleAddToCart = (book) => {
    showNotification(`${book.title} berhasil ditambahkan ke keranjang!`)
    setIsBookDetailModalOpen(false)
  }

  // Book Detail Modal
  const BookDetailModal = ({ book }) => {
    if (!book) return null

    return (
      <div className="modal-overlay" onClick={() => setIsBookDetailModalOpen(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Detail Buku</h3>
            <button className="modal-close" onClick={() => setIsBookDetailModalOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="book-detail-content">
            <div className="book-detail-left">
              <h2 className="book-detail-title">{book.title}</h2>

              <div className="book-detail-tags">
                {book.grade > 0 && <span className="pasar-buku-tag pasar-buku-tag-grade">Kelas {book.grade}</span>}
                {book.grade === 0 && <span className="pasar-buku-tag pasar-buku-tag-grade">Umum</span>}
                {book.category && <span className="pasar-buku-tag pasar-buku-tag-category">{book.category}</span>}
              </div>

              <p className="book-detail-description">{book.description}</p>

              <div className="book-detail-info">
                <div className="book-detail-info-item">
                  <span className="book-detail-info-label">Penerbit</span>
                  <span className="book-detail-info-value">{book.publisher || "Penerbit Resmi"}</span>
                </div>
                <div className="book-detail-info-item">
                  <span className="book-detail-info-label">Pelajar</span>
                  <span className="book-detail-info-value">{book.students} siswa</span>
                </div>
                <div className="book-detail-info-item">
                  <span className="book-detail-info-label">Rating</span>
                  <span className="book-detail-info-value">{book.rating} / 5.0</span>
                </div>
                <div className="book-detail-info-item">
                  <span className="book-detail-info-label">Harga Sewa</span>
                  <span className="book-detail-info-value">{book.price}</span>
                </div>
              </div>

              <div className="book-detail-actions">
                <button className="book-detail-button book-detail-button-secondary">
                  <BookOpen size={18} />
                  <span>Lihat Preview</span>
                </button>
                <button className="book-detail-button book-detail-button-primary" onClick={() => handleAddToCart(book)}>
                  <ShoppingCart size={18} />
                  <span>Tambahkan ke Keranjang</span>
                </button>
              </div>
            </div>
            <div className="book-detail-right">
              <img
                src={book.image || "/placeholder.svg?height=320&width=220"}
                alt={book.title}
                className="book-detail-image"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Filter Modal
  const FilterModal = () => (
    <div className="modal-overlay" onClick={() => setIsFilterOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Filter Buku</h3>
          <button className="modal-close" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="filter-modal-content">
          <div className="filter-group">
            <label htmlFor="grade-filter">Kelas:</label>
            <select
              id="grade-filter"
              value={selectedGrade !== null ? selectedGrade : ""}
              onChange={(e) => setSelectedGrade(e.target.value !== "" ? Number.parseInt(e.target.value) : null)}
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
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">Semua</option>
              {["Sains", "Sosial", "Peminatan"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter-modal-footer">
          <button
            className="filter-modal-button filter-reset"
            onClick={() => {
              setSelectedGrade(null)
              setSelectedCategory(null)
            }}
          >
            Reset
          </button>
          <button className="filter-modal-button filter-apply" onClick={() => setIsFilterOpen(false)}>
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="pasar-buku-container">
        <Header />
        <main className="pasar-buku-main">
          <div className="pasar-buku-header">
            <div className="pasar-buku-title-section">
              <h1 className="pasar-buku-title">Pasar Buku</h1>
              <p className="pasar-buku-subtitle">Jelajahi koleksi buku pembelajaran kami</p>
            </div>
            <div className="pasar-buku-actions">
              <button
                className={`pasar-buku-button ${sortState > 0 ? "pasar-buku-button-active" : ""}`}
                onClick={() => setSortState((prev) => (prev + 1) % 3)}
              >
                <ArrowDownAZ className="pasar-buku-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pasar-buku-icon" />}
                {sortState === 2 && <ChevronDown className="pasar-buku-icon" />}
              </button>

              <button
                className={`pasar-buku-button ${selectedGrade !== null || selectedCategory !== null ? "pasar-buku-button-active" : ""}`}
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pasar-buku-icon" />
                <span>Filter</span>
              </button>

              <button className="pasar-buku-button pasar-buku-cart" onClick={() => navigate("/keranjang")}>
                <ShoppingCart className="pasar-buku-icon" />
                <span>Keranjang Sewa</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="pasar-buku-search">
            <Search className="pasar-buku-search-icon" />
            <input
              type="text"
              placeholder="Cari judul buku..."
              className="pasar-buku-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Book Grid */}
          {sortedBooks.length > 0 ? (
            <div className="pasar-buku-grid">
              {sortedBooks.map((book) => (
                <div
                  key={book.id}
                  className="pasar-buku-card"
                  onClick={() => {
                    setSelectedBook(book)
                    setIsBookDetailModalOpen(true)
                  }}
                >
                  <div className="pasar-buku-card-header">
                    <div className="pasar-buku-tags">
                      {book.grade > 0 && (
                        <span className="pasar-buku-tag pasar-buku-tag-grade">Kelas {book.grade}</span>
                      )}
                      {book.grade === 0 && <span className="pasar-buku-tag pasar-buku-tag-grade">Umum</span>}
                      {book.category && <span className="pasar-buku-tag pasar-buku-tag-category">{book.category}</span>}
                    </div>

                    <h2 className="pasar-buku-card-title">{book.title}</h2>
                    <p className="pasar-buku-card-description">{book.description}</p>
                  </div>

                  <div className="pasar-buku-card-content">
                    <div className="pasar-buku-card-image">
                      <img src={book.image || "/placeholder.svg?height=160&width=110"} alt={book.title} />
                    </div>
                    <div className="pasar-buku-card-info">
                      <div className="pasar-buku-card-detail">
                        <Users className="pasar-buku-card-detail-icon" />
                        <span>{book.students} siswa</span>
                      </div>
                      <div className="pasar-buku-card-detail">
                        <Book className="pasar-buku-card-detail-icon" />
                        <span>Kelas {book.grade || "Umum"}</span>
                      </div>
                      <div className="pasar-buku-card-detail">
                        <Calendar className="pasar-buku-card-detail-icon" />
                        <span>30 hari sewa</span>
                      </div>
                    </div>
                  </div>

                  <div className="pasar-buku-card-footer">
                    <div className="pasar-buku-card-price">{book.price}</div>
                    <button
                      className="pasar-buku-card-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(book)
                      }}
                    >
                      <ShoppingCart size={14} />
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pasar-buku-empty">
              <BookOpen className="pasar-buku-empty-icon" />
              <h2 className="pasar-buku-empty-title">Tidak ada buku ditemukan</h2>
              <p className="pasar-buku-empty-description">
                Buku yang Anda cari tidak ditemukan. Coba gunakan kata kunci lain atau reset filter.
              </p>
              <button
                className="pasar-buku-empty-button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGrade(null)
                  setSelectedCategory(null)
                }}
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Filter Modal */}
          {isFilterOpen && <FilterModal />}

          {/* Book Detail Modal */}
          {isBookDetailModalOpen && selectedBook && <BookDetailModal book={selectedBook} />}

          {/* Notification */}
          {notification.message && (
            <div className={`notification ${notification.type === "error" ? "notification-error" : ""}`}>
              {notification.type === "success" ? (
                <CheckCircle className="notification-icon" />
              ) : (
                <X className="notification-icon" />
              )}
              <span>{notification.message}</span>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}
