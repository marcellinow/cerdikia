import React from "react";
import KelasLayout from "./KelasLayout";

export default function Kelas2() {
  const subjects = [
    {
      id: 1,
      name: "Subject 1",
      image: "/placeholder.svg",
      bgColor: "bg-blue-100",
      modules: 3,
    },
    {
      id: 2,
      name: "Subject 2",
      image: "/placeholder.svg",
      bgColor: "bg-red-100",
      modules: 4,
    },
  ];

  return (
    <KelasLayout
      title="Kelas 2"
      description="Pilih mata pelajaran untuk melihat modul."
      subjects={subjects}
    />
  );
}
