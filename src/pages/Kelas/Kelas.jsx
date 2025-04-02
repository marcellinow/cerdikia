import React from "react";
import Layout from "../../components/Layout"; // Import Layout component
import "./Kelas.css"; // Import CSS file

export default function Kelas() {
  return (
    <Layout>
      <div className="kelas-container">
        <h1 className="kelas-title">Halaman Kelas</h1>
        <p className="kelas-description">
          Ini adalah halaman dummy untuk fitur kelas. Anda dapat menambahkan
          konten sesuai kebutuhan.
        </p>
        <div className="kelas-content">
          <div className="kelas-card">
            <h2>Kelas 1</h2>
            <p>Deskripsi singkat tentang kelas 1.</p>
          </div>
          <div className="kelas-card">
            <h2>Kelas 2</h2>
            <p>Deskripsi singkat tentang kelas 2.</p>
          </div>
          <div className="kelas-card">
            <h2>Kelas 3</h2>
            <p>Deskripsi singkat tentang kelas 3.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
