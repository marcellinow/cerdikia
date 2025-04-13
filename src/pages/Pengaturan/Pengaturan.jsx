"use client"

import { User, Bell, Shield, Palette, Globe, HelpCircle } from "lucide-react"
import Layout from "../../components/Layout"
import "./Pengaturan.css"

export default function Pengaturan() {
  return (
    <Layout>
      <div className="pengaturan-container">
        <div className="pengaturan-header">
          <div className="pengaturan-title-section">
            <h1 className="pengaturan-title">Pengaturan</h1>
            <p className="pengaturan-description">
              Kelola preferensi dan pengaturan akun Anda untuk pengalaman belajar yang lebih baik.
            </p>
          </div>
        </div>

        <div className="pengaturan-content">
          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <User />
            </div>
            <div className="pengaturan-card-content">
              <h2>Profil</h2>
              <p>Perbarui informasi profil, foto, dan detail kontak Anda.</p>
            </div>
          </div>

          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <Shield />
            </div>
            <div className="pengaturan-card-content">
              <h2>Keamanan</h2>
              <p>Kelola password, autentikasi dua faktor, dan keamanan akun.</p>
            </div>
          </div>

          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <Bell />
            </div>
            <div className="pengaturan-card-content">
              <h2>Notifikasi</h2>
              <p>Atur preferensi notifikasi email, aplikasi, dan pengingat.</p>
            </div>
          </div>

          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <Palette />
            </div>
            <div className="pengaturan-card-content">
              <h2>Tampilan</h2>
              <p>Sesuaikan tema, ukuran font, dan preferensi tampilan.</p>
            </div>
          </div>

          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <Globe />
            </div>
            <div className="pengaturan-card-content">
              <h2>Bahasa</h2>
              <p>Ubah bahasa aplikasi dan preferensi regional.</p>
            </div>
          </div>

          <div className="pengaturan-card">
            <div className="pengaturan-card-icon">
              <HelpCircle />
            </div>
            <div className="pengaturan-card-content">
              <h2>Bantuan</h2>
              <p>Dapatkan bantuan, lihat FAQ, dan hubungi dukungan.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
