import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import cerdikia from "../../assets/Img/logo-cerdikia.svg"
import googleLogo from "../../assets/Img/google-logo.svg"
import "./Login.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { email, password })
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login attempt")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={cerdikia || "/placeholder.svg"} alt="Cerdikia Logo" />
        </div>

        <h1 className="login-title">Masuk ke Akun Anda</h1>
        <p className="login-subtitle">Masukkan email dan password untuk melanjutkan</p>

        <form onSubmit={handleSubmit} className="login-form">
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
                placeholder="Masukkan password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Lupa password?</a>
            </div>
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
          <img src={googleLogo || "/placeholder.svg"} alt="Google Logo" />
          <span>Masuk dengan Google</span>
        </button>

        <p className="signup-prompt">
          Belum punya akun? <a href="/signup">Daftar sekarang</a>
        </p>
      </div>
    </div>
  )
}

