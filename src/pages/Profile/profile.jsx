import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getAuth, signOut } from "firebase/auth"; // <-- tambahkan signOut
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Layout from "../../components/Layout";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No user data found in Firestore.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Berhasil keluar.");
      navigate("/"); // arahkan ke halaman login
    } catch (error) {
      console.error("Gagal logout:", error.message);
      alert("Gagal logout: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <button
          className="profile-back-button"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="profile-back-icon" />
          <span>Kembali</span>
        </button>

        <div className="profile-card">
          <div className="profile-picture">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Profile"
              className="profile-picture-img"
            />
          </div>

          <div className="profile-info">
            <h1 className="profile-name">
              {userData ? userData.name : "Memuat..."}
            </h1>
            <p className="profile-role">
              Role: {userData ? userData.role : "Memuat..."}
            </p>
            <p className="profile-instansi">
              Instansi: {userData?.instansi || "SD Negeri 1 Jakarta"}
            </p>
            <p className="profile-lokasi">
              Lokasi: {userData?.lokasi || "Jakarta, Indonesia"}
            </p>
          </div>

          <button className="profile-signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
}
