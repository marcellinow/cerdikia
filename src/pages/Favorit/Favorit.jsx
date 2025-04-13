import React, { useState, useEffect } from 'react';
import { Book, Clock, Heart, Bookmark } from 'lucide-react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import './Favorit.css';

const Favorit = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch favorites from backend/Firebase
    // For now using dummy data
    const dummyFavorites = [
      {
        id: 1,
        title: "Matematika Dasar Kelas 6",
        description: "Pembelajaran matematika dasar untuk siswa kelas 6 SD mencakup aritmatika, geometri, dan pengukuran.",
        image: "/images/MTK.svg",
        subject: "Matematika",
        duration: "45 menit",
        savedCount: 128
      },
      {
        id: 2,
        title: "Bahasa Indonesia - Menulis Kreatif",
        description: "Panduan lengkap menulis kreatif untuk mengembangkan kemampuan berbahasa dan berimajinasi.",
        image: "/images/BINDO.svg",
        subject: "Bahasa Indonesia",
        duration: "30 menit",
        savedCount: 95
      },
      {
        id: 3,
        title: "English Conversation Practice",
        description: "Practice your English conversation skills with interactive lessons and exercises.",
        image: "/images/BING.svg",
        subject: "English",
        duration: "40 menit",
        savedCount: 156
      }
    ];

    setTimeout(() => {
      setFavorites(dummyFavorites);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="favorit-container">
          <Header />
          <div className="favorit-main">
            <div className="favorit-header">
              <div className="favorit-title-section">
                <h1 className="favorit-title">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="favorit-container">
        <Header />
        <div className="favorit-main">
          <div className="favorit-header">
            <div className="favorit-title-section">
              <h1 className="favorit-title">Konten Favorit Saya</h1>
              <p className="favorit-description">
                Koleksi materi pembelajaran yang telah Anda tandai sebagai favorit. Akses dengan mudah kapan saja.
              </p>
            </div>
          </div>

          {favorites.length > 0 ? (
            <div className="favorit-content">
              {favorites.map((item) => (
                <div key={item.id} className="favorit-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="favorit-card-image"
                  />
                  <div className="favorit-card-content">
                    <h3 className="favorit-card-title">{item.title}</h3>
                    <p className="favorit-card-description">{item.description}</p>
                    <div className="favorit-card-meta">
                      <span className="favorit-meta-item">
                        <Book className="favorit-meta-icon" />
                        {item.subject}
                      </span>
                      <span className="favorit-meta-item">
                        <Clock className="favorit-meta-icon" />
                        {item.duration}
                      </span>
                      <span className="favorit-meta-item">
                        <Bookmark className="favorit-meta-icon" />
                        {item.savedCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="favorit-empty">
              <Heart className="favorit-empty-icon" />
              <h2 className="favorit-empty-title">Belum Ada Favorit</h2>
              <p className="favorit-empty-description">
                Anda belum menandai konten apapun sebagai favorit. Jelajahi materi pembelajaran dan tandai yang Anda sukai untuk menyimpannya di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Favorit;