import React, { useEffect, useState } from "react";
import "./ARPage.css";

function ARPage() {
  const [isVRReady, setIsVRReady] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      // Load only A-Frame, we don't need AR.js
      const aframeScript = document.createElement("script");
      aframeScript.src = "https://aframe.io/releases/1.4.2/aframe.min.js";
      aframeScript.async = true;
      document.head.appendChild(aframeScript);

      aframeScript.onload = () => {
        setIsVRReady(true);
      };
    };

    loadScripts();

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[src*="aframe"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      const video = document.getElementById("oceannn");
      if (video) {
        video.play().catch((err) => console.warn("Autoplay prevented:", err));
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [isVRReady]);

  return (
    <div className="vr-container">
      {isVRReady ? (
        <a-scene
          vr-mode-ui="enabled: true"
          loading-screen="dotsColor: #3b82f6; backgroundColor: #000"
        >
          <a-assets>
            <video
              id="oceannn"
              src="/videos/oceannn.mp4"
              preload="auto"
              loop
              muted
              playsinline
              webkit-playsinline
              crossorigin="anonymous"
            ></video>
          </a-assets>

          <a-videosphere 
            src="#oceannn"
            rotation="0 -90 0"
            material="shader: flat;"
          ></a-videosphere>

          <a-entity position="0 1.6 0">
            <a-camera look-controls wasd-controls></a-camera>
          </a-entity>
        </a-scene>
      ) : (
        <div className="vr-loading">
          <p>🎥 Loading VR environment...</p>
          <p>Click to start the experience</p>
        </div>
      )}
    </div>
  );
}

export default ARPage;