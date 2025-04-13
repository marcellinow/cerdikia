"use client"

import { useState, useEffect } from "react"
import {
  MessageSquare,
  Heart,
  Share2,
  ImageIcon,
  Send,
  Smile,
  MoreHorizontal,
  Search,
  Loader2,
  ChevronRight,
} from "lucide-react"
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import "./Komunitas.css"

// Example data for posts
const examplePosts = [
  {
    id: 1,
    content:
      "Hari ini saya baru saja selesai mengajar tentang konsep perkalian dengan metode baru. Siswa sangat antusias! 📚✨ #PembelajaranKreatif",
    createdAt: new Date("2025-04-13T09:30:00"),
    likes: 24,
    comments: 5,
    shares: 2,
    user: {
      name: "Pak Budi",
      role: "Guru Matematika",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    content:
      "Ada yang punya saran buku referensi untuk mengajar Bahasa Indonesia kelas 4 SD? Saya ingin membuat materi yang lebih menarik untuk anak-anak. 🤔📖",
    createdAt: new Date("2025-04-13T08:15:00"),
    likes: 15,
    comments: 8,
    shares: 1,
    user: {
      name: "Ibu Sarah",
      role: "Guru Bahasa Indonesia",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    content:
      "Berbagi pengalaman mengajar online: bagaimana cara membuat siswa tetap fokus selama pembelajaran jarak jauh? Mari diskusi di kolom komentar! 💻🎯",
    createdAt: new Date("2025-04-12T16:45:00"),
    likes: 42,
    comments: 12,
    shares: 7,
    user: {
      name: "Pak Ahmad",
      role: "Guru IPA",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function Komunitas() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    // Simulate loading posts
    setTimeout(() => {
      setPosts(examplePosts)
      setLoading(false)
    }, 1000)

    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser
      if (user) {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          setUserData(userSnap.data())
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    const user = auth.currentUser
    if (!user) {
      alert("Silakan login terlebih dahulu")
      return
    }

    // Create new post with current user data
    const newPostData = {
      id: posts.length + 1,
      content: newPost,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      user: {
        name: userData?.name || "Pengguna",
        role: userData?.role || "Guru",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    setPosts([newPostData, ...posts])
    setNewPost("")
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Layout>
      <div className="komunitas-container">
        <Header />
        <div className="komunitas-header">
          <div className="komunitas-title-section">
            <h1 className="komunitas-title">Komunitas Guru</h1>
            <p className="komunitas-subtitle">
              Berbagi pengalaman, diskusi, dan berkolaborasi dengan sesama guru di seluruh Indonesia
            </p>
          </div>
        </div>

        <main className="komunitas-main">
          <div className="komunitas-sidebar">
            <div className="komunitas-profile-card">
              <div className="profile-header">
                <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="profile-picture" />
                <div className="profile-info">
                  <h3>{userData?.name || "Pengguna"}</h3>
                  <p>{userData?.role || "Guru"}</p>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">120</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">1.2K</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">3.4K</span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>
            </div>

            <div className="trending-topics">
              <div className="trending-header">
                <h3>Trending Topics</h3>
                <a href="#" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="topic-list">
                <div className="topic-item">
                  <span className="topic-name">#PendidikanIndonesia</span>
                  <span className="topic-posts">2.4K posts</span>
                </div>
                <div className="topic-item">
                  <span className="topic-name">#BelajarBareng</span>
                  <span className="topic-posts">1.8K posts</span>
                </div>
                <div className="topic-item">
                  <span className="topic-name">#TipsGuru</span>
                  <span className="topic-posts">956 posts</span>
                </div>
                <div className="topic-item">
                  <span className="topic-name">#KurikulumMerdeka</span>
                  <span className="topic-posts">742 posts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="komunitas-content">
            <div className="post-form-container">
              <form onSubmit={handleCreatePost}>
                <div className="post-input-wrapper">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt={userData?.name || "User"}
                    className="user-avatar"
                  />
                  <textarea
                    placeholder="Apa yang Anda pikirkan?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                </div>
                <div className="post-form-actions">
                  <div className="post-attachments">
                    <button type="button">
                      <ImageIcon size={20} />
                    </button>
                    <button type="button">
                      <Smile size={20} />
                    </button>
                  </div>
                  <button type="submit" className="post-submit-btn">
                    <Send size={18} />
                    <span>Kirim</span>
                  </button>
                </div>
              </form>
            </div>

            {loading ? (
              <div className="loading-state">
                <Loader2 className="loading-icon" />
                <span>Memuat posts...</span>
              </div>
            ) : (
              <div className="posts-container">
                {posts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-user-info">
                        <img
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.name}
                          className="user-avatar"
                        />
                        <div>
                          <h4>{post.user.name}</h4>
                          <span className="post-time">{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      <button className="post-menu-btn">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>
                    <div className="post-actions">
                      <button className="post-action-btn">
                        <Heart size={18} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="post-action-btn">
                        <MessageSquare size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="post-action-btn">
                        <Share2 size={18} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="komunitas-suggestions">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Cari di Komunitas..." className="search-input" />
            </div>

            <div className="suggestions-card">
              <div className="suggestions-header">
                <h3>Guru yang Mungkin Anda Kenal</h3>
                <a href="#" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="suggested-users">
                {[
                  { name: "Ibu Dewi", school: "SD Negeri 1 Bandung" },
                  { name: "Pak Rudi", school: "SD Negeri 3 Surabaya" },
                  { name: "Ibu Siti", school: "SD Negeri 2 Yogyakarta" },
                ].map((user, i) => (
                  <div key={i} className="suggested-user">
                    <img src="/placeholder.svg?height=40&width=40" alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p>{user.school}</p>
                    </div>
                    <button className="follow-btn">Ikuti</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="upcoming-events">
              <div className="upcoming-header">
                <h3>Acara Mendatang</h3>
                <a href="#" className="view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="event-list">
                <div className="event-item">
                  <div className="event-date">
                    <span className="event-day">15</span>
                    <span className="event-month">Apr</span>
                  </div>
                  <div className="event-info">
                    <h4>Webinar Pembelajaran Interaktif</h4>
                    <p>Online • 14:00 - 16:00 WIB</p>
                  </div>
                </div>
                <div className="event-item">
                  <div className="event-date">
                    <span className="event-day">22</span>
                    <span className="event-month">Apr</span>
                  </div>
                  <div className="event-info">
                    <h4>Workshop Kurikulum Merdeka</h4>
                    <p>Jakarta • 09:00 - 15:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
