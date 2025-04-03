import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../../components/Layout"; // Import Layout component
import { ChevronLeft } from "lucide-react"; // Import ChevronLeft icon
import "./profile.css"; // Import CSS file

export default function Profile() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Layout>
      <div className="profile-container">
        {/* Back Button */}
        <button
          className="profile-back-button"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <ChevronLeft className="profile-back-icon" />
          <span>Kembali</span>
        </button>

        <div className="profile-card">
          {/* Profile Picture */}
          <div className="profile-picture">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Profile"
              className="profile-picture-img"
            />
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <h1 className="profile-name">Siti</h1>
            <p className="profile-role">Role: Guru</p>
            <p className="profile-instansi">Instansi: SD Negeri 1 Jakarta</p>
            <p className="profile-lokasi">Lokasi: Jakarta, Indonesia</p>
          </div>

          {/* Sign Out Button */}
          <button className="profile-signout-button">Sign Out</button>
        </div>
      </div>
    </Layout>
  );
}
