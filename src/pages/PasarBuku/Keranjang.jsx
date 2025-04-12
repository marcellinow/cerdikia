import { useNavigate } from "react-router-dom"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import { ChevronLeft, ShoppingCart, Book, Clock, ShoppingBag } from "lucide-react"
import "./Keranjang.css"

export default function Keranjang() {
  const navigate = useNavigate()

  // Sample items for the shopping cart
  const cartItems = [
    {
      id: 1,
      title: "Matematika Kelas 4",
      description: "Buku pegangan siswa untuk mata pelajaran matematika kelas 4 SD.",
      icon: <Book />,
      rentalPeriod: "30 hari",
      price: "Rp 25.000",
    },
    {
      id: 2,
      title: "IPA Terpadu",
      description: "Buku pembelajaran IPA terpadu dengan praktikum sederhana untuk kelas 5 SD.",
      icon: <Book />,
      rentalPeriod: "45 hari",
      price: "Rp 30.000",
    },
    {
      id: 3,
      title: "Bahasa Indonesia",
      description: "Panduan lengkap bahasa Indonesia dengan latihan membaca dan menulis.",
      icon: <Book />,
      rentalPeriod: "30 hari",
      price: "Rp 20.000",
    },
  ]

  // Calculate total price
  const calculateTotal = () => {
    return "Rp 75.000"
  }

  return (
    <Layout>
      <Header />
      <div className="keranjang-container">
        <main className="keranjang-main">
          <div className="keranjang-header">
            <button className="keranjang-back-button" onClick={() => navigate(-1)}>
              <ChevronLeft className="keranjang-back-icon" />
              <span>Kembali</span>
            </button>
            <h1 className="keranjang-title">Keranjang Sewa</h1>
            <p className="keranjang-description">
              Anda dapat melihat dan mengelola semua buku yang Anda tambahkan ke keranjang sewa di sini.
            </p>
          </div>

          {cartItems.length > 0 ? (
            <>
              <div className="keranjang-content">
                {cartItems.map((item) => (
                  <div className="keranjang-card" key={item.id}>
                    <div className="keranjang-card-decoration"></div>
                    <div className="keranjang-card-content">
                      <div className="keranjang-card-icon">{item.icon}</div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>

                      <div
                        className="keranjang-card-info"
                        style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Clock size={16} />
                          <span>{item.rentalPeriod}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <ShoppingBag size={16} />
                          <span>{item.price}</span>
                        </div>
                      </div>

                      <div className="keranjang-card-actions">
                        <button className="keranjang-card-button keranjang-card-button-secondary">Hapus</button>
                        <button className="keranjang-card-button keranjang-card-button-primary">Detail</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="keranjang-summary">
                <h2 className="keranjang-summary-title">Ringkasan Pesanan</h2>
                <div className="keranjang-summary-item">
                  <span className="keranjang-summary-label">Matematika Kelas 4</span>
                  <span className="keranjang-summary-value">Rp 25.000</span>
                </div>
                <div className="keranjang-summary-item">
                  <span className="keranjang-summary-label">IPA Terpadu</span>
                  <span className="keranjang-summary-value">Rp 30.000</span>
                </div>
                <div className="keranjang-summary-item">
                  <span className="keranjang-summary-label">Bahasa Indonesia</span>
                  <span className="keranjang-summary-value">Rp 20.000</span>
                </div>

                <div className="keranjang-summary-total">
                  <span>Total</span>
                  <span>{calculateTotal()}</span>
                </div>

                <div className="keranjang-checkout">
                  <button className="keranjang-checkout-button">
                    <ShoppingCart size={18} />
                    <span>Proses Pesanan</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="keranjang-empty">
              <ShoppingCart className="keranjang-empty-icon" />
              <h2 className="keranjang-empty-title">Keranjang Sewa Kosong</h2>
              <p className="keranjang-empty-description">
                Anda belum menambahkan buku apapun ke keranjang sewa. Silahkan kembali ke Pasar Buku untuk menemukan
                buku yang ingin Anda sewa.
              </p>
              <button className="keranjang-empty-button" onClick={() => navigate("/pasar-buku")}>
                Ke Pasar Buku
              </button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}
