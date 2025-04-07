import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import cerdikia from "../../assets/Img/logo-cerdikia.svg";
import googleLogo from "../../assets/Img/google-logo.svg";
import "./Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification("Password dan konfirmasi tidak cocok."); // Set error notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: fullName,
        email: user.email,
        role: "guru",
        createdAt: new Date(),
      });

      setNotification("Pendaftaran berhasil! Selamat datang!"); // Set success notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering:", error.message);
      setNotification("Pendaftaran gagal: " + error.message); // Set error notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "guru",
        createdAt: new Date(),
      });

      setNotification("Pendaftaran dengan Google berhasil! Selamat datang!"); // Set success notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
      navigate("/dashboard");
    } catch (error) {
      console.error("Google register failed:", error.message);
      setNotification("Pendaftaran dengan Google gagal: " + error.message); // Set error notification
      setTimeout(() => setNotification(""), 4000); // Hide notification after 4 seconds
    }
  };

  return (
    <div className="register-container">
      {notification && (
        <div className="notification">{notification}</div> // Display notification
      )}
      <div className="register-card">
        <div className="register-logo">
          <img src={cerdikia} alt="Cerdikia Logo" />
        </div>

        <h1 className="register-title">Buat Akun Baru</h1>
        <p className="register-subtitle">
          Daftar untuk mendapatkan akses ke semua fitur
        </p>

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
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
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
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span className="checkbox-text">
                Saya menyetujui <a href="/terms">Syarat dan Ketentuan</a> serta{" "}
                <a href="/privacy">Kebijakan Privasi</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={!agreeTerms}
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button
          type="button"
          className="google-register-button"
          onClick={handleGoogleRegister}
        >
          <img src={googleLogo} alt="Google Logo" />
          <span>Daftar dengan Google</span>
        </button>

        <p className="login-prompt">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Masuk
          </span>
        </p>
      </div>
    </div>
  );
}
