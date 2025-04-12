import { useState } from "react"
import { Eye, EyeOff, LogIn, AlertCircle, CheckCircle } from "lucide-react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider, db } from "../../firebase/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

import cerdikia from "../../assets/Img/logo-cerdikia.svg"
import googleLogo from "../../assets/Img/google-logo.svg"
import "./Login.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ message: "", type: "" })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Login success:", userCredential.user)
      setNotification({
        message: "Login berhasil! Selamat datang!",
        type: "success",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error.message)
      setNotification({
        message: "Login gagal: " + error.message,
        type: "error",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Simpan ke Firestore jika belum ada
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email,
          uid: user.uid,
          role: "guru",
          createdAt: new Date(),
        })
      }

      console.log("Google login success:", user)
      setNotification({
        message: "Login Google berhasil! Selamat datang!",
        type: "success",
      })
      setTimeout(() => setNotification({ message: "", type: "" }), 4000)
      navigate("/dashboard")
    } catch (error) {
      console.error("Google login error:", error.message)
      setNotification({
        message: "Login Google gagal: " + error.message,
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

        <h1 className="auth-title">Masuk ke Akun Anda</h1>
        <p className="auth-subtitle">Masukkan email dan password untuk melanjutkan</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Masukkan password"
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
            <div className="forgot-password">
              <a href="/forgot-password">Lupa password?</a>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              "Memproses..."
            ) : (
              <>
                <LogIn size={18} style={{ marginRight: "8px" }} />
                Masuk
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button type="button" className="google-auth-button" onClick={handleGoogleLogin} disabled={isLoading}>
          <img src={googleLogo || "/placeholder.svg"} alt="Google Logo" />
          <span>Masuk dengan Google</span>
        </button>

        <p className="auth-prompt">
          Belum punya akun?{" "}
          <span onClick={() => navigate("/register")} className="auth-prompt-link">
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  )
}
