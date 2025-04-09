import React, { useEffect, useState } from "react";
import { loadVideoToAssets } from "../../videoLoader";

function ARPage() {
  const [isARReady, setIsARReady] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      const aframeScript = document.createElement("script");
      aframeScript.src = "https://aframe.io/releases/1.3.0/aframe.min.js";
      aframeScript.async = true;
      document.head.appendChild(aframeScript);

      aframeScript.onload = () => {
        const arjsScript = document.createElement("script");
        arjsScript.src =
          "https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.1/aframe/build/aframe-ar.min.js";
        arjsScript.async = true;
        document.head.appendChild(arjsScript);

        arjsScript.onload = () => {
          setIsARReady(true);
        };
      };
    };

    loadScripts();
  }, []);

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      {isARReady ? (
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets>
            <video
              id="oceannn"
              src="/videos/oceannn.mp4"
              preload="auto"
              loop
              muted
              autoplay
              crossorigin="anonymous"
              playsinline
            ></video>
          </a-assets>

          <a-videosphere 
            src="#oceannn"
            rotation="0 180 0"
            play-on-click
          ></a-videosphere>

          <a-camera position="0 0 0"></a-camera>
        </a-scene>
      ) : (
        <p style={{ color: "#555", padding: "2rem" }}>Loading AR environment...</p>
      )}
    </div>
  );
}

export default ARPage;
