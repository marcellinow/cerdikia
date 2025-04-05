import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { Search } from "lucide-react";
import "./ModulLayout.css";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ModulLayout({ title, subtitle, grade, pelajaran }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const q = query(
          collection(db, "modules"),
          where("grade", "==", grade),
          ...(pelajaran ? [where("pelajaran", "==", pelajaran)] : [])
        );

        const querySnapshot = await getDocs(q);
        const fetchedModules = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setModules(fetchedModules);
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
          )}
        </main>
      </div>
    </Layout>
  );
}
