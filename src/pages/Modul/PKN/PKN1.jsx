import React from "react";
import { useParams } from "react-router-dom";
import modules from "../../../data/Modul/modules.js"; // Import modules data
import ModulLayout from "../ModulLayout"; // Import ModulLayout

export default function PKNModules() {
  const { kelasId } = useParams(); // Ambil parameter kelasId dari URL

  // Filter modul berdasarkan pelajaran "PKN" dan grade 1
  const filteredModules = modules.filter(
    (module) => module.pelajaran === "PKN" && module.grade === 1
  );

  return (
    <ModulLayout
      title="Modules"
      subtitle="Katalog Modul PKN Kelas 1"
      modules={filteredModules}
    />
  );
}
