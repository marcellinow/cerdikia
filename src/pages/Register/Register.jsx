"use client"

import { useState } from "react"
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from "lucide-react"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, provider, db } from "../../firebase/firebase"
import { useNavigate } from "react-router-dom"

import cerdikia from "../../assets/Img/logo-cerdikia.svg"
import googleLogo from "../../assets/Img/google-logo.svg"
import "./Register.css"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [notification, setNotification] = useState({ message: "", type: "" })
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      setNotification({
        message: "Password dan konfirmasi tidak cocok.",
        type: "error",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      await updateProfile(user, { displayName: fullName })

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: fullName,
        email: user.email,
        role: "guru",
        createdAt: new Date(),
      })

      setNotification({
        message: "Pendaftaran berhasil! Selamat datang!",
        type: "success",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error registering:", error.message)
      setNotification({
        message: "Pendaftaran gagal: " + error.message,
        type: "error",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "guru",
        createdAt: new Date(),
      })

      setNotification({
        message: "Pendaftaran dengan Google berhasil! Selamat datang!",
        type: "success",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
      navigate("/dashboard")
    } catch (error) {
      console.error("Google register failed:", error.message)
      setNotification({
        message: "Pendaftaran dengan Google gagal: " + error.message,
        type: "error",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      {/* Background decorations */}
      <div className="auth-decoration decoration-circle-1"></div>
      <div className="auth-decoration decoration-circle-2"></div>

      {/* Notification */}
      {notification.message && (
        <div
          className={`notification ${notification.type === "success" ? "notification-success" : "notification-error"}`}
        >
          <span className="notification-icon">
            {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          </span>
          <span>{notification.message}</span>
        </div>
      )}

      <div className="auth-card">
        <div className="auth-logo">
          <img src={cerdikia || "/placeholder.svg"} alt="Cerdikia Logo" />
        </div>

        <h1 className="auth-title">Buat Akun Baru</h1>
        <p className="auth-subtitle">Daftar untuk mendapatkan akses ke semua fitur</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Buat password (min. 8 karakter)"
                minLength="8"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Masukkan password kembali"
                minLength="8"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                disabled={isLoading}
              />
              <span className="checkbox-text">
                Saya menyetujui <a href="/terms">Syarat dan Ketentuan</a> serta <a href="/privacy">Kebijakan Privasi</a>
              </span>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={!agreeTerms || isLoading}>
            {isLoading ? (
              "Memproses..."
            ) : (
              <>
                <UserPlus size={18} style={{ marginRight: "8px" }} />
                Daftar Sekarang
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button type="button" className="google-auth-button" onClick={handleGoogleRegister} disabled={isLoading}>
          <img src={googleLogo || "/placeholder.svg"} alt="Google Logo" />
          <span>Daftar dengan Google</span>
        </button>

        <p className="auth-prompt">
          Sudah punya akun?{" "}
          <span onClick={() => navigate("/")} className="auth-prompt-link">
            Masuk
          </span>
        </p>
      </div>
    </div>
  )
}
