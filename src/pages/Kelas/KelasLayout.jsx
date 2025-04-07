import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { ChevronLeft } from "lucide-react"; // Import ChevronLeft icon
import "./KelasLayout.css";

export default function KelasLayout({ title, description, subjects }) {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Layout>
      <div className="kelas-container">
        <Header />
        {/* Back Button */}
        <button
          className="kelas-back-button"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <ChevronLeft className="kelas-back-icon" />
          <span>Kembali</span>
        </button>
        <main className="kelas-main">
          <div className="kelas-header">
            <h1 className="kelas-title">{title}</h1>
            <p className="kelas-description">{description}</p>
          </div>

          <div className="kelas-grid">
            {subjects.map((subject) => (
              <div
                key={subject.subjectId} // Updated key
                className="kelas-card"
                onClick={() => navigate(subject.subjectPath)} // Updated path
              >
                <div className={`kelas-card-image ${subject.bgColor}`}>
                  <img
                    src={subject.subjectImage || "/placeholder.svg"} // Updated image key
                    alt={subject.subjectName} // Updated name key
                  />
                  <div className="kelas-card-badge">
                    {subject.moduleId?.length || 0} Modul{" "}
                    {/* Updated module count */}
                  </div>
                </div>
                <div className="kelas-card-content">
                  <h3 className="kelas-card-title">{subject.subjectName}</h3>{" "}
                  {/* Updated name key */}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
