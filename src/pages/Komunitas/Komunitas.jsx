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
import { getAuth, onAuthStateChanged } from "firebase/auth"
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
      "Hai semua! Baru saja selesai mengajar materi baru tentang pecahan. Ada yang punya tips menarik untuk membuat pembelajaran lebih interaktif? 📚✨",
    createdAt: new Date("2025-04-13T10:30:00"),
    likes: 24,
    comments: 8,
    shares: 3,
    user: {
      name: "Bu Siti",
      role: "Guru Matematika",
      avatar: "/profile/profile1.png",
    },
  },
  {
    id: 2,
    content:
      "Berbagi pengalaman menggunakan media pembelajaran digital di kelas. Siswa jadi lebih antusias! 🎯💻",
    createdAt: new Date("2025-04-13T09:15:00"),
    likes: 18,
    comments: 5,
    shares: 2,
    user: {
      name: "Bu Rini",
      role: "Guru Bahasa Indonesia",
      avatar: "/profile/profile2.png",
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
      avatar: "/profile/profile3.png",
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            setUserData(userSnap.data())
          } else {
            setUserData({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: "Guru"
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
      // Load example posts after user data is fetched
      setPosts(examplePosts)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

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
        avatar: userData?.photoURL || "/placeholder.svg", 
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

  const suggestedUsers = [
    { name: "Ibu Dewi", school: "SD Negeri 1 Bandung", avatar: "/profile/profile1.png" },
    { name: "Pak Rudi", school: "SD Negeri 3 Surabaya", avatar: "/profile/profile2.png" },
    { name: "Ibu Siti", school: "SD Negeri 2 Yogyakarta", avatar: "/profile/profile3.png" },
  ];

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
                <img src={userData?.photoURL || "/placeholder.svg?height=80&width=80"} alt="Profile" className="profile-picture" />
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
                    src={userData?.photoURL || "/placeholder.svg?height=40&width=40"}
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
                {suggestedUsers.map((user, i) => (
                  <div key={i} className="suggested-user">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
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
