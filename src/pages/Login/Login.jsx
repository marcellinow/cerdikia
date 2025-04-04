import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import cerdikia from "../../assets/Img/logo-cerdikia.svg";
import googleLogo from "../../assets/Img/google-logo.svg";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ⬅️ untuk redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success:", userCredential.user);
      alert("Login berhasil!");
      navigate("/dashboard"); // ⬅️ Redirect ke dashboard
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login gagal: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login success:", result.user);
      alert("Login Google berhasil!");
      navigate("/dashboard"); // ⬅️ Redirect juga
    } catch (error) {
      console.error("Google login error:", error.message);
      alert("Login Google gagal: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={cerdikia} alt="Cerdikia Logo" />
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
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
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
          <img src={googleLogo} alt="Google Logo" />
          <span>Masuk dengan Google</span>
        </button>

        <p className="signup-prompt">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")} // ⬅️ Navigasi ke register
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}
