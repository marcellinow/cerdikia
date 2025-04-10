import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { Search, ChevronLeft } from "lucide-react"; // Import ChevronLeft icon
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SubjectLayout.css";
import subjects from "../../data/Subjects/subjects"; // Import subjects data
import modules from "../../data/Modul/modules"; // Import modules data

export default function SubjectLayout({ title, subtitle, grade, pelajaran }) {
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchModules = () => {
      try {
        console.log("Grade:", grade, "Pelajaran:", pelajaran);

        const subject = subjects.find(
          (subj) => subj.classId === grade && subj.subjectName === pelajaran
        );

        if (!subject) {
          console.error("Subject not found");
          setFilteredModules([]);
          return;
        }

        // Filter modules based on moduleIds from the subject
        const modulesForSubject = modules.filter((module) =>
          subject.moduleIds.includes(module.moduleId)
        );

        // Log the filtered modules to ensure they are fetched correctly
        console.log("Filtered Modules:", modulesForSubject);

        setFilteredModules(modulesForSubject);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [grade, pelajaran]);

  return (
    <Layout>
      <div className="modul-layout-container">
        <Header />
        {/* Back Button */}
        <button
          className="modul-layout-back-button"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <ChevronLeft className="modul-layout-back-icon" />
          <span>Kembali</span>
        </button>
        <main className="modul-layout-main">
          <div className="modul-layout-header">
            <h1 className="modul-layout-title">{title}</h1>
            <p className="modul-layout-subtitle">{subtitle}</p>
            <button className="modul-layout-search-button">
              <Search className="modul-layout-search-icon" />
            </button>
          </div>

          {loading ? (
            <p>Loading modules...</p>
          ) : (
            <div className="modul-layout-grid">
              {filteredModules.map((module) => (
                <a
                  href={`/kelas/${module.gradeLevel}/module/${module.moduleId}`}
                  key={module.moduleId}
                  className="modul-layout-card"
                >
                  <div className="modul-layout-card-image">
                    <img
                      src={module.image || "/placeholder.svg"}
                      alt={module.moduleTitle}
                      className="modul-layout-card-img"
                    />
                  </div>
                  <div className="modul-layout-card-content">
                    <h3 className="modul-layout-card-title">
                      {module.moduleTitle}
                    </h3>
                    <p className="modul-layout-card-description">
                      {module.moduleDescription}
                    </p>
                    <span className="modul-layout-card-pages">
                      {module.totalPages} pages
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
