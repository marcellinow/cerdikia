import React, { useEffect, useState } from "react";
import KelasLayout from "./KelasLayout";
import { db } from "../../firebase/firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Kelas1() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Ambil data subjects dari Firestore
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const subjectsData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((subject) => subject.classId === 1); // Filter untuk kelas 1

        // Log data subjects yang diambil
        console.log("Subjects fetched:", subjectsData);

        setSubjects(subjectsData);
      } catch (error) {
        console.error("Gagal mengambil data subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectClick = (subjectPath) => {
    navigate(subjectPath);
  };

  return (
    <KelasLayout
      title="Kelas 1"
      description="Pilih mata pelajaran untuk melihat modul."
      subjects={subjects.map((subject) => ({
        ...subject,
        onClick: () => handleSubjectClick(subject.subjectPath),
      }))}
    />
  );
}
