import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import cerdikia from "../../assets/Img/logo-cerdikia.svg"
import googleLogo from "../../assets/Img/google-logo.svg"
import "./Register.css"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    // Handle registration logic here
    console.log("Registration attempt with:", { fullName, email, password, agreeTerms })
  }

  const handleGoogleRegister = () => {
    // Handle Google registration logic here
    console.log("Google registration attempt")
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo">
          <img src={cerdikia || "/placeholder.svg"} alt="Cerdikia Logo" />
        </div>

        <h1 className="register-title">Buat Akun Baru</h1>
        <p className="register-subtitle">Daftar untuk mendapatkan akses ke semua fitur</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
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
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
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
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
              <span className="checkbox-text">
                Saya menyetujui <a href="/terms">Syarat dan Ketentuan</a> serta <a href="/privacy">Kebijakan Privasi</a>
              </span>
            </label>
          </div>

          <button type="submit" className="register-button" disabled={!agreeTerms}>
            Daftar Sekarang
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button type="button" className="google-register-button" onClick={handleGoogleRegister}>
          <img src={googleLogo || "/placeholder.svg"} alt="Google Logo" />
          <span>Daftar dengan Google</span>
        </button>

        <p className="login-prompt">
          Sudah punya akun? <a href="/login">Masuk</a>
        </p>
      </div>
    </div>
  )
}

