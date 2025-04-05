import React from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout"; // Import Layout component
import { Search } from "lucide-react";
import "./ModulLayout.css"; // Import CSS file

export default function ModulLayout({ title, subtitle, modules }) {
  return (
    <Layout>
      <div className="modul-layout-container">
        <Header />
        <main className="modul-layout-main">
          <div className="modul-layout-header">
            <h1 className="modul-layout-title">{title}</h1>
            <p className="modul-layout-subtitle">{subtitle}</p>
            <button className="modul-layout-search-button">
              <Search className="modul-layout-search-icon" />
            </button>
          </div>

          <div className="modul-layout-grid">
            {modules.map((module) => (
              <a
                href={`/kelas/${module.grade}/module/${module.moduleid}`}
                key={module.moduleid}
                className="modul-layout-card"
              >
                <div className="modul-layout-card-image">
                  <img
                    src={module.image || "/placeholder.svg"}
                    alt={module.title}
                    className="modul-layout-card-img"
                  />
                </div>
                <div className="modul-layout-card-content">
                  <h3 className="modul-layout-card-title">{module.title}</h3>
                  <p className="modul-layout-card-description">
                    {module.description}
                  </p>
                  <span className="modul-layout-card-pages">
                    {module.pages} pages
                  </span>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
