import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../../components/Layout"; // Import Layout component
import Header from "../../components/Header"; // Import Header component
import { ChevronLeft } from "lucide-react"; // Import ChevronLeft icon
import "./Keranjang.css"; // Import CSS file

export default function Keranjang() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Layout>
      <Header />
      <div className="keranjang-container">
        <main className="keranjang-main">
          {/* Back Button */}
          <button
            className="keranjang-back-button"
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            <ChevronLeft className="keranjang-back-icon" />
            <span>Kembali</span>
          </button>

          <h1 className="keranjang-title">Keranjang Sewa</h1>
          <p className="keranjang-description">
            Halaman ini adalah dummy untuk fitur keranjang sewa. Anda dapat
            menambahkan konten sesuai kebutuhan.
          </p>
          <div className="keranjang-content">
            <div className="keranjang-card">
              <h2>Item 1</h2>
              <p>Deskripsi singkat tentang item 1.</p>
            </div>
            <div className="keranjang-card">
              <h2>Item 2</h2>
              <p>Deskripsi singkat tentang item 2.</p>
            </div>
            <div className="keranjang-card">
              <h2>Item 3</h2>
              <p>Deskripsi singkat tentang item 3.</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
