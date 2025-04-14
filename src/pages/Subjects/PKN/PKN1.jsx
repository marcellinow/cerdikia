import React, { useEffect, useState } from "react";
import SubjectLayput from "../SubjectLayout";
import { db } from "../../../firebase/firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";

export default function PKNModules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Ambil data modul dari Firestore
        const querySnapshot = await getDocs(collection(db, "modules"));
        const modulesData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (module) =>
              module.subjectName ===
                "Pendidikan Pancasila dan Kewarganegaraan" &&
              module.gradeLevel === 1
          );
        setModules(modulesData);
      } catch (error) {
        console.error("Gagal mengambil data modul:", error);
      }
    };

    fetchModules();
  }, []);

  return (
    <SubjectLayput
      title="Pendidikan Pancasila dan Kewarganegaraan"
      subtitle="Katalog Modul PKN Kelas 1"
      grade={1}
      pelajaran="Pendidikan Pancasila dan Kewarganegaraan"
      modules={modules}
    />
  );
}
