export function loadVideoToAssets(videoId, videoUrl) {
    // Buat <video> element
    const video = document.createElement("video");
    video.id = videoId;
    video.src = videoUrl;
    video.setAttribute("crossorigin", "anonymous");
    video.setAttribute("loop", "true");
    video.setAttribute("preload", "auto");
    video.setAttribute("playsinline", "true");
  
    // autoplay jika user interaksi
    video.autoplay = true;
    video.muted = true;
  
    // Tambahkan ke <a-assets>
    const assets = document.querySelector("a-assets");
    if (assets) {
      assets.appendChild(video);
    } else {
      console.error("a-assets not found");
    }
  }
  