import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import PasarBuku from "./src/pages/PasarBuku/PasarBuku";
import Pembelajaran from "./src/pages/Pembelajaran/Pembelajaran";
import Jadwal from "./src/pages/Jadwal/Jadwal";
import Kelas from "./src/pages/Kelas/Kelas";
import Pengaturan from "./src/pages/Pengaturan/Pengaturan";
import Keranjang from "./src/pages/PasarBuku/Keranjang"; // Import Keranjang page
import Profile from "./src/pages/Profile/profile"; // Import Profile page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pasar-buku" element={<PasarBuku />} />
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/pembelajaran" element={<Pembelajaran />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/profile" element={<Profile />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
