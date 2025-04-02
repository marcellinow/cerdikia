import Header from "../../components/Header"; // Corrected the import path
import Layout from "../../components/Layout"; // Import the Layout component
import { Filter, ListFilter, ShoppingCart } from "lucide-react";
import "./PasarBuku.css"; // Import the CSS file

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

  return (
    <Layout>
      <div className="pasar-buku-container">
        <Header />
        <main className="pasar-buku-main">
          <div className="pasar-buku-header">
            <h1 className="pasar-buku-title">Pasar Buku</h1>
            <div className="pasar-buku-actions">
              <button className="pasar-buku-button">
                <ListFilter className="pasar-buku-icon" />
                <span>Urutkan</span>
              </button>
              <button className="pasar-buku-button">
                <Filter className="pasar-buku-icon" />
                <span>Filter</span>
              </button>
              <button className="pasar-buku-button pasar-buku-cart">
                <ShoppingCart className="pasar-buku-icon" />
                <span>Keranjang Sewa</span>
              </button>
            </div>
          </div>

          <div className="pasar-buku-grid">
            {books.map((book) => (
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
