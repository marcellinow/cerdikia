import React from "react";
import KelasLayout from "./KelasLayout";
import PPKN from "../../assets/Img/PPKN.svg";
import BINDO from "../../assets/Img/BINDO.svg";
import MTK from "../../assets/Img/MTK.svg";

export default function Kelas1() {
  const subjects = [
    {
      id: 1,
      name: "Pendidikan Pancasila dan Kewarganegaraan",
      image: PPKN,
      bgColor: "bg-orange-100",
      modules: 5,
    },
    {
      id: 2,
      name: "Bahasa Indonesia",
      image: BINDO,
      bgColor: "bg-red-100",
      modules: 5,
    },
    {
      id: 3,
      name: "Matematika",
      image: MTK,
      bgColor: "bg-blue-100",
      modules: 5,
    },
  ];

  return (
    <KelasLayout
      title="Kelas 1"
      description="Pilih mata pelajaran untuk melihat modul."
      subjects={subjects}
    />
  );
}
