import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import PasarBuku from "./src/pages/PasarBuku/PasarBuku";
import Pembelajaran from "./src/pages/Pembelajaran/Pembelajaran";
import Jadwal from "./src/pages/Jadwal/Jadwal";
import Pengaturan from "./src/pages/Pengaturan/Pengaturan";
import Keranjang from "./src/pages/PasarBuku/Keranjang";
import Profile from "./src/pages/Profile/profile";
import Kelas1 from "./src/pages/Kelas/Kelas1";
import Kelas2 from "./src/pages/Kelas/Kelas2";
import Kelas3 from "./src/pages/Kelas/Kelas3";
import Kelas4 from "./src/pages/Kelas/Kelas4";
import Kelas5 from "./src/pages/Kelas/Kelas5";
import Kelas6 from "./src/pages/Kelas/Kelas6";
import Ekstrakurikuler from "./src/pages/Kelas/Ekstrakurikuler";
import Peminatan from "./src/pages/Kelas/Peminatan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pasar-buku" element={<PasarBuku />} />
        <Route path="/pembelajaran" element={<Pembelajaran />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kelas/1" element={<Kelas1 />} />
        <Route path="/kelas/2" element={<Kelas2 />} />
        <Route path="/kelas/3" element={<Kelas3 />} />
        <Route path="/kelas/4" element={<Kelas4 />} />
        <Route path="/kelas/5" element={<Kelas5 />} />
        <Route path="/kelas/6" element={<Kelas6 />} />
        <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
        <Route path="/peminatan" element={<Peminatan />} />
      </Routes>
    </Router>
  );
}

export default App;
