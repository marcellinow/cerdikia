import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import cerdikia from "../../assets/Img/logo-cerdikia.svg";
import googleLogo from "../../assets/Img/google-logo.svg";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login success:", userCredential.user);
      setNotification("Login berhasil! Selamat datang!"); // Set success notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      setNotification("Login gagal: " + error.message); // Set error notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Simpan ke Firestore jika belum ada
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email,
          uid: user.uid,
          role: "guru",
          createdAt: new Date(),
        });
      }

      console.log("Google login success:", user);
      setNotification("Login Google berhasil! Selamat datang!"); // Set success notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error.message);
      setNotification("Login Google gagal: " + error.message); // Set error notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
    }
  };

  return (
    <div className="login-container">
      {notification && (
        <div className="notification">{notification}</div> // Display notification
      )}
      <div className="login-card">
        <div className="login-logo">
          <img src={cerdikia} alt="Cerdikia Logo" />
        </div>

        <h1 className="login-title">Masuk ke Akun Anda</h1>
        <p className="login-subtitle">
          Masukkan email dan password untuk melanjutkan
        </p>

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

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="Google Logo" />
          <span>Masuk dengan Google</span>
        </button>

        <p className="signup-prompt">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Daftar sekarang
          </span>
        </p>
      </div>
    </div>
  );
}
