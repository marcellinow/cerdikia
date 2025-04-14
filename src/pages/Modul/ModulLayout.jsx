import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Header from "../../components/Header";
import { ChevronUp, Download, Video } from "lucide-react";
import "./ModulLayout.css";

export default function ModulLayout({ params }) {
  const navigate = useNavigate(); // Initialize navigate
  const { id: kelasId, moduleId, slideId } = params;

  // Convert slideId to number
  const currentSlide = Number.parseInt(slideId, 10);

  // Total slides in this presentation
  const totalSlides = 10;

  // Module information
  const moduleInfo = {
    id: moduleId,
    title: "Module 1 - Pengantar Pendidikan Kewarganegaraan",
    subtitle: "Pendidikan Pancasila dan Kewarganegaraan",
    creator: "Akhwan Iman, S.Pd., M.Pd.",
    createdAt: "05/03/25 14:32",
    updatedBy: "Akhwan Iman, S.Kom., M.T.",
    updatedAt: "20/03/25 10:16",
    virtualClassDate: "27 Maret 2025",
  };

  // Slide content based on slideId
  const getSlideContent = () => {
    if (currentSlide === 1) {
      return {
        image: "/placeholder.svg?height=400&width=600",
        title: "KONSEP DASAR PENDIDIKAN KEWARGANEGARAAN",
        author: "Akhwan, S.Pd., M.Pd.",
      };
    } else if (currentSlide > 1 && currentSlide < totalSlides) {
      return {
        image: "/placeholder.svg?height=400&width=600",
        content: `
          <div class="slide-content">
            <h3>(Pengantar)</h3>
            <p>➤ Visi : menjadi sumber nilai & pedoman bagi penyelenggaraan program studi dlm mengembangkan kepribadian sbg WNI</p>
            <p>➤ Misi : membantu mahasiswa agar mampu mewujudkan nilai dasar kesadaran berbangsa & bernegara dlm menerapkan ilmu pengetahuan, teknologi & seni yg dikuasainya dgn rasa tanggung jawab kemanusiaan.</p>
          </div>
        `,
      };
    } else {
      return {
        image: "/placeholder.svg?height=400&width=600",
        title: "The End",
        subtitle: "Thanks For Your Attention",
      };
    }
  };

  const slideContent = getSlideContent();

  // Navigation functions
  const goToPreviousSlide = () => {
    if (currentSlide > 1) {
      navigate(
        `/kelas/${kelasId}/module/${moduleId}/slide/${currentSlide - 1}`
      );
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < totalSlides) {
      navigate(
        `/kelas/${kelasId}/module/${moduleId}/slide/${currentSlide + 1}`
      );
    }
  };

  return (
    <div className="modul-layout-container">
      <Header />
      <main className="modul-layout-main">
        <div className="modul-layout-header">
          <h1 className="modul-layout-title">{moduleInfo.title}</h1>
          <p className="modul-layout-subtitle">{moduleInfo.subtitle}</p>
        </div>

        <div className="modul-layout-content">
          {/* Slide PPT Section */}
          <div className="modul-layout-slide-section">
            <div className="modul-layout-slide-header">
              <span className="modul-layout-slide-title">Slide PPT</span>
              <button
                onClick={() => navigate(`/kelas/${kelasId}/module/${moduleId}`)}
                className="modul-layout-slide-button"
              >
                <ChevronUp className="modul-layout-slide-icon" />
              </button>
            </div>

            {/* Slide Content */}
            <div className="modul-layout-slide-content">
              {/* Slide Navigation */}
              <div className="modul-layout-slide-navigation">
                <button
                  onClick={goToPreviousSlide}
                  disabled={currentSlide === 1}
                  className={`modul-layout-slide-nav-button ${
                    currentSlide === 1 ? "disabled" : ""
                  }`}
                >
                  Back
                </button>
                <div className="modul-layout-slide-nav-info">
                  Page {currentSlide}/{totalSlides}
                </div>
                <button
                  onClick={goToNextSlide}
                  disabled={currentSlide === totalSlides}
                  className={`modul-layout-slide-nav-button ${
                    currentSlide === totalSlides ? "disabled" : ""
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Slide Display */}
              <div className="modul-layout-slide-display">
                {currentSlide === 1 && (
                  <div className="modul-layout-slide-first">
                    <div className="modul-layout-slide-number">1</div>
                    <div className="modul-layout-slide-title">
                      KONSEP DASAR
                      <br />
                      PENDIDIKAN
                      <br />
                      KEWARGANEGARAAN
                    </div>
                    <div className="modul-layout-slide-author">
                      Akhwan, S.Pd., M.Pd.
                    </div>
                  </div>
                )}

                {currentSlide > 1 && currentSlide < totalSlides && (
                  <div
                    className="modul-layout-slide-middle"
                    dangerouslySetInnerHTML={{ __html: slideContent.content }}
                  ></div>
                )}

                {currentSlide === totalSlides && (
                  <div className="modul-layout-slide-last">
                    <h2>The End</h2>
                    <p>Thanks For Your Attention</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
