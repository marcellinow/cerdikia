import React, { useEffect } from "react";
import { loadVideoToAssets } from "../videoLoader";

function ARPage() {
  useEffect(() => {
    const aframeScript = document.createElement("script");
    aframeScript.src = "https://aframe.io/releases/1.3.0/aframe.min.js";
    aframeScript.async = true;
    document.head.appendChild(aframeScript);

    const arjsScript = document.createElement("script");
    arjsScript.src =
      "https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.1/aframe/build/aframe-ar.min.js";
    arjsScript.async = true;
    document.head.appendChild(arjsScript);

    aframeScript.onload = () => {
      // Setelah A-Frame selesai dimuat, masukkan video
      const gdriveDirectURL =
        "https://drive.google.com/uc?export=download&id=1KdyrR0cZUjaWcJP89TTCPYIOLq_werWx";
      loadVideoToAssets("gdriveVideo", gdriveDirectURL);
    };

    return () => {
      document.head.removeChild(aframeScript);
      document.head.removeChild(arjsScript);
    };
  }, []);

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-assets></a-assets>

        <a-marker preset="hiro">
          <a-video
            src="#gdriveVideo"
            width="2"
            height="1"
            position="0 0 0"
          ></a-video>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}

export default ARPage;
