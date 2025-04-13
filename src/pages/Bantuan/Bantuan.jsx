"use client"

import { Mail, Phone, MessageCircle, HelpCircle, Book, BookOpen, Users, Laptop, Search } from "lucide-react"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import "./Bantuan.css"

export default function Bantuan() {
  const faqs = [
    {
      question: "Apa itu Cerdikia?",
      answer:
        "Cerdikia adalah platform pembelajaran digital yang dirancang khusus untuk guru SD di Indonesia. Platform ini menyediakan berbagai fitur seperti materi pembelajaran, komunitas guru, manajemen jadwal, dan pasar buku digital untuk mendukung proses belajar mengajar yang lebih efektif.",
    },
    {
      question: "Bagaimana cara memulai menggunakan Cerdikia?",
      answer:
        "Untuk mulai menggunakan Cerdikia, Anda perlu mendaftar akun terlebih dahulu. Setelah mendaftar dan masuk, Anda dapat mengakses semua fitur seperti materi pembelajaran, komunitas, jadwal, dan pasar buku digital.",
    },
    {
      question: "Apakah Cerdikia berbayar?",
      answer:
        "Cerdikia menyediakan fitur dasar secara gratis untuk semua pengguna. Beberapa fitur premium seperti akses ke materi khusus atau buku digital mungkin memerlukan langganan atau pembayaran terpisah.",
    },
    {
      question: "Bagaimana cara mengunduh materi pembelajaran?",
      answer:
        "Anda dapat mengunduh materi pembelajaran dengan mengakses menu Pembelajaran, memilih mata pelajaran yang diinginkan, dan mengklik tombol unduh pada materi yang tersedia.",
    },
    {
      question: "Apakah saya bisa berbagi materi dengan guru lain?",
      answer:
        "Ya, Anda dapat berbagi materi dan berkolaborasi dengan guru lain melalui fitur Komunitas. Di sini Anda bisa berdiskusi, berbagi pengalaman, dan bertukar materi pembelajaran.",
    },
  ]

  const features = [
    {
      icon: <Book />,
      title: "Materi Pembelajaran",
      description: "Akses ribuan materi pembelajaran yang terstruktur sesuai kurikulum",
    },
    {
      icon: <Users />,
      title: "Komunitas Guru",
      description: "Bergabung dengan komunitas guru untuk berbagi pengalaman dan pengetahuan",
    },
    {
      icon: <BookOpen />,
      title: "Pasar Buku Digital",
      description: "Temukan dan akses buku-buku pembelajaran dalam format digital",
    },
    {
      icon: <Laptop />,
      title: "Pembelajaran Interaktif",
      description: "Gunakan fitur AR dan multimedia untuk pembelajaran yang lebih menarik",
    },
  ]

  return (
    <Layout>
      <div className="bantuan-container">
        <Header />
        <div className="bantuan-main">
          <div className="bantuan-hero">
            <div className="bantuan-hero-content">
              <h1 className="bantuan-title">Pusat Bantuan</h1>
              <p className="bantuan-subtitle">Temukan jawaban untuk pertanyaan Anda tentang penggunaan Cerdikia</p>
              <div className="bantuan-search">
                <Search className="bantuan-search-icon" />
                <input type="text" placeholder="Cari bantuan..." className="bantuan-search-input" />
                <button className="bantuan-search-button">Cari</button>
              </div>
            </div>
            <div className="bantuan-hero-decoration">
              <div className="decoration-element element-1"></div>
              <div className="decoration-element element-2"></div>
              <div className="decoration-element element-3"></div>
            </div>
          </div>

          <div className="bantuan-content">
            {/* Fitur Utama */}
            <section className="bantuan-section">
              <div className="section-header">
                <h2 className="section-title">Fitur Utama</h2>
                <p className="section-subtitle">Jelajahi berbagai fitur yang tersedia di platform Cerdikia</p>
              </div>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bantuan-section">
              <div className="section-header">
                <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
                <p className="section-subtitle">Jawaban untuk pertanyaan umum tentang Cerdikia</p>
              </div>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question">
                      <HelpCircle className="question-icon" />
                      <h3>{faq.question}</h3>
                    </div>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Kontak */}
            <section className="bantuan-section">
              <div className="section-header">
                <h2 className="section-title">Hubungi Kami</h2>
                <p className="section-subtitle">Butuh bantuan lebih lanjut? Tim dukungan kami siap membantu Anda</p>
              </div>
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon-wrapper">
                    <Mail className="contact-icon" />
                  </div>
                  <h3 className="contact-title">Email</h3>
                  <p className="contact-info">support@cerdikia.id</p>
                  <p className="contact-info">info@cerdikia.id</p>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <h3 className="contact-title">Telepon</h3>
                  <p className="contact-info">021-1234-5678</p>
                  <p className="contact-info">Senin - Jumat, 08:00 - 17:00 WIB</p>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-wrapper">
                    <MessageCircle className="contact-icon" />
                  </div>
                  <h3 className="contact-title">Live Chat</h3>
                  <p className="contact-info">Tersedia 24/7</p>
                  <button className="chat-button">Mulai Chat</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}
