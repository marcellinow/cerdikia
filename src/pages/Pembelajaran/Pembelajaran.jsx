import React from "react";
import Header from "../../components/Header"
import Layout from "../../components/Layout" // Import the Layout component
import "./Pembelajaran.css" // Import the CSS file

export default function Pembelajaran() {
  return (
    <Layout>
      <div className="pembelajaran-container">
        <Header />
        <main className="pembelajaran-main">
          <div className="pembelajaran-heading">
            <h1>Pembelajaran</h1>
          </div>

          <div className="pembelajaran-actions">
            <button className="pembelajaran-button">
              <span>Urutkan</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list-filter"
              >
                <path d="M3 6h18" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </button>
            <button className="pembelajaran-button">
              <span>Filter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-filter"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>

          {/* Subject Grid */}
          <div className="pembelajaran-grid">
            {/* Card 1 - Pendidikan Pancasila */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-orange-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Pendidikan Pancasila" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Pendidikan Pancasila dan Kewarganegaraan</h3>
              </div>
            </div>

            {/* Card 2 - Bahasa Indonesia */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-red-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Bahasa Indonesia" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Bahasa Indonesia</h3>
              </div>
            </div>

            {/* Card 3 - Matematika */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-blue-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Matematika" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Matematika</h3>
              </div>
            </div>

            {/* Card 4 - Pendidikan Jasmani */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-yellow-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Pendidikan Jasmani" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Pendidikan Jasmani, Olahraga, dan Kesehatan</h3>
              </div>
            </div>

            {/* Card 5 - Seni dan Budaya */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-purple-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Seni dan Budaya" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Seni dan Budaya</h3>
              </div>
            </div>

            {/* Card 6 - Bahasa Inggris */}
            <div className="pembelajaran-card">
              <div className="pembelajaran-card-image bg-green-100">
                <img src="/placeholder.svg?height=200&width=400" alt="Bahasa Inggris" />
                <div className="pembelajaran-card-badge">5 Modul</div>
              </div>
              <div className="pembelajaran-card-content">
                <h3 className="pembelajaran-card-title">Bahasa Inggris</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

