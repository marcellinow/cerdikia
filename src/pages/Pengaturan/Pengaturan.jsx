import React from "react";
import Layout from "../../components/Layout"; // Import Layout component
import "./Pengaturan.css"; // Import CSS file

export default function Pengaturan() {
  return (
    <Layout>
      <div className="pengaturan-container">
        <h1 className="pengaturan-title">Halaman Pengaturan</h1>
        <p className="pengaturan-description">
          Ini adalah halaman dummy untuk fitur pengaturan. Anda dapat
          menambahkan konten sesuai kebutuhan.
        </p>
        <div className="pengaturan-content">
          <div className="pengaturan-card">
            <h2>Profil</h2>
            <p>Atur informasi profil Anda.</p>
          </div>
          <div className="pengaturan-card">
            <h2>Keamanan</h2>
            <p>Kelola pengaturan keamanan akun Anda.</p>
          </div>
          <div className="pengaturan-card">
            <h2>Notifikasi</h2>
            <p>Sesuaikan preferensi notifikasi Anda.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
