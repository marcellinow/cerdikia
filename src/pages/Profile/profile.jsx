"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, User, Mail, MapPin, Building, LogOut, Loader2 } from "lucide-react"
import { getAuth, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import Layout from "../../components/Layout"
import "./Profile.css"

export default function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser

        if (user) {
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            setUserData(userSnap.data())
          } else {
            console.log("No user data found in Firestore.")
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      alert("Berhasil keluar.")
      navigate("/") // arahkan ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error.message)
      alert("Gagal logout: " + error.message)
    }
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <button className="profile-back-button" onClick={() => navigate(-1)}>
            <ChevronLeft className="profile-back-icon" />
            <span>Kembali</span>
          </button>
          <h1 className="profile-header-title">Profil Pengguna</h1>
        </div>

        <div className="profile-content">
          {loading ? (
            <div className="profile-loading">
              <Loader2 className="profile-loading-icon animate-spin" />
              <p>Memuat data pengguna...</p>
            </div>
          ) : (
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-picture">
                  <img src={userData?.photoURL || "/placeholder.svg?height=128&width=128"} alt="Profile" className="profile-picture-img" />
                </div>
                <h2 className="profile-name">{userData ? userData.name : "Nama Pengguna"}</h2>
                <div className="profile-badge">{userData ? userData.role : "Guru"}</div>
              </div>

              <div className="profile-card-content">
                <div className="profile-info-item">
                  <User className="profile-info-icon" />
                  <div className="profile-info-text">
                    <span className="profile-info-label">Nama Lengkap</span>
                    <span className="profile-info-value">{userData ? userData.name : "Nama Pengguna"}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <Mail className="profile-info-icon" />
                  <div className="profile-info-text">
                    <span className="profile-info-label">Email</span>
                    <span className="profile-info-value">{userData ? userData.email : "email@example.com"}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <Building className="profile-info-icon" />
                  <div className="profile-info-text">
                    <span className="profile-info-label">Instansi</span>
                    <span className="profile-info-value">{userData?.instansi || "SD Negeri 1 Jakarta"}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <MapPin className="profile-info-icon" />
                  <div className="profile-info-text">
                    <span className="profile-info-label">Lokasi</span>
                    <span className="profile-info-value">{userData?.lokasi || "Jakarta, Indonesia"}</span>
                  </div>
                </div>
              </div>

              <div className="profile-card-footer">
                <button className="profile-signout-button" onClick={handleSignOut}>
                  <LogOut className="profile-signout-icon" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
