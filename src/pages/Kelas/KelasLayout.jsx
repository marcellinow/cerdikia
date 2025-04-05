import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import "./KelasLayout.css";

export default function KelasLayout({ title, description, subjects }) {
  return (
    <Layout>
      <div className="kelas-container">
        <Header />
        <main className="kelas-main">
          <div className="kelas-header">
            <h1 className="kelas-title">{title}</h1>
            <p className="kelas-description">{description}</p>
          </div>

          <div className="kelas-grid">
            {subjects.map((subject) => (
              <div key={subject.id} className="kelas-card">
                <div className={`kelas-card-image ${subject.bgColor}`}>
                  <img
                    src={subject.image || "/placeholder.svg"}
                    alt={subject.name}
                  />
                  <div className="kelas-card-badge">
                    {subject.modules} Modul
                  </div>
                </div>
                <div className="kelas-card-content">
                  <h3 className="kelas-card-title">{subject.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
