import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import PasarBuku from "./src/pages/PasarBuku/PasarBuku";
import Pembelajaran from "./src/pages/Pembelajaran/Pembelajaran";
import Jadwal from "./src/pages/Jadwal/Jadwal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pasar-buku" element={<PasarBuku />} />
        <Route path="/pembelajaran" element={<Pembelajaran />} />
        <Route path="/jadwal" element={<Jadwal />} />
      </Routes>
    </Router>
  );
}

export default App;
