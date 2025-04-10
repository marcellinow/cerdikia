import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import "./Pembelajaran.css";
import { ArrowDownAZ, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { db } from "../../firebase/firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Pembelajaran() {
  const [subjects, setSubjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortState, setSortState] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Ambil data subjects dari Firestore
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const subjectsData = querySnapshot.docs.map((doc) => doc.data());

        // Filter hanya untuk PKN
        const pknSubject = subjectsData.filter(
          (subject) =>
            subject.subjectName === "Pendidikan Pancasila dan Kewarganegaraan"
        );

        console.log("PKN Subject fetched:", pknSubject);

        setSubjects(pknSubject);
      } catch (error) {
        console.error("Gagal mengambil data subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Sort subjects based on sortState
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortState === 1) {
      return a.subjectName.localeCompare(b.subjectName);
    } else if (sortState === 2) {
      return b.subjectName.localeCompare(a.subjectName);
    }
    return 0;
  });

  return (
    <Layout>
      <div className="pembelajaran-container">
        <Header />
        <main className="pembelajaran-main">
          <div className="pembelajaran-header">
            <h1 className="pembelajaran-title">Pembelajaran</h1>
            <div className="pembelajaran-actions">
              {/* Sort Button */}
              <button
                className="pembelajaran-button"
                onClick={() => setSortState((prev) => (prev + 1) % 3)}
              >
                <ArrowDownAZ className="pembelajaran-icon" />
                <span>Urutkan</span>
                {sortState === 1 && <ChevronUp className="pembelajaran-icon" />}
                {sortState === 2 && (
                  <ChevronDown className="pembelajaran-icon" />
                )}
              </button>

              {/* Filter Button */}
              <button
                className="pembelajaran-button"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="pembelajaran-icon" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="pembelajaran-grid">
            {sortedSubjects.map((subject) => (
              <div
                key={subject.subjectId}
                className="pembelajaran-card"
                onClick={() => navigate(subject.subjectPath)} // Navigate to subjectPath
              >
                <div className={`pembelajaran-card-image bg-orange-100`}>
                  <img
                    src={subject.subjectImage || "/placeholder.svg"}
                    alt={subject.subjectName}
                  />
                  <div className="pembelajaran-card-badge">
                    {subject.moduleCount} Modul
                  </div>
                </div>
                <div className="pembelajaran-card-content">
                  <h3 className="pembelajaran-card-title">
                    {subject.subjectName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
