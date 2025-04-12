import { useEffect, useState, useRef } from "react"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import "./ARPage.css"

export default function VideoBackgroundPlayer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [selfieSegmenter, setSelfieSegmenter] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showPlaybackSpeed, setShowPlaybackSpeed] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [volume, setVolume] = useState(100)
  const [previousVolume, setPreviousVolume] = useState(100)
  const [showVolume, setShowVolume] = useState(false)
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [hasWebcamPermission, setHasWebcamPermission] = useState(false)
  const [webcamError, setWebcamError] = useState(null)
  const [setupComplete, setSetupComplete] = useState(false)
  
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  const volumeRef = useRef(null)

  // Helper function to join classNames conditionally
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  useEffect(() => {
    // Only initialize background video player
    const backgroundVideo = document.getElementById("backgroundVideo")
    if (backgroundVideo) {
      backgroundVideo.addEventListener("loadedmetadata", () => {
        setDuration(backgroundVideo.duration)
        setIsReady(true)
      })
      
      backgroundVideo.addEventListener("timeupdate", updateProgress)
      
      return () => {
        backgroundVideo.removeEventListener("timeupdate", updateProgress)
        backgroundVideo.removeEventListener("loadedmetadata", () => {})
      }
    }
  }, [])
  
  const initializeWebcam = async () => {
    try {
      // Clear any previous error
      setWebcamError(null);
      
      // Request webcam access with more specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false 
      });
      
      // Make sure webcamRef exists before assigning the stream
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        webcamRef.current.onloadedmetadata = () => {
          webcamRef.current.play()
            .then(() => {
              console.log("Webcam started successfully");
              setHasWebcamPermission(true);
              setSetupComplete(true);
            })
            .catch(err => {
              console.error("Error playing webcam:", err);
              setWebcamError("Error starting webcam: " + err.message);
              setHasWebcamPermission(false);
            });
        };
      } else {
        console.error("Webcam ref is not available");
        setWebcamError("Webcam element not found");
        setHasWebcamPermission(false);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      
      // Provide more specific error messages based on the error
      if (err.name === 'NotAllowedError') {
        setWebcamError("Camera access denied. Please allow camera access in your browser settings.");
      } else if (err.name === 'NotFoundError') {
        setWebcamError("No camera found. Please connect a camera and try again.");
      } else if (err.name === 'NotReadableError') {
        setWebcamError("Camera is in use by another application. Please close other applications using the camera.");
      } else {
        setWebcamError(err.message || "Failed to access webcam");
      }
      
      setHasWebcamPermission(false);
    }
  }

  const updateProgress = () => {
    const video = document.getElementById("backgroundVideo")
    if (video) {
      setCurrentTime(video.currentTime)
    }
  }

  const handlePlayPause = () => {
    if (!setupComplete) {
      // If setup not complete, show an alert or message to set up camera first
      alert("Please set up your camera first before playing the video");
      return;
    }
    
    const video = document.getElementById("backgroundVideo")
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play().catch((err) => console.warn("Playback prevented:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    const video = document.getElementById("backgroundVideo")
    if (video) {
      if (isMuted) {
        video.muted = false
        setVolume(previousVolume)
        video.volume = previousVolume / 100
      } else {
        setPreviousVolume(volume)
        video.muted = true
        setVolume(0)
        video.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseInt(e.target.value)
    const video = document.getElementById("backgroundVideo")
    if (video) {
      setVolume(newVolume)
      video.volume = newVolume / 100
      setIsMuted(newVolume === 0)
      if (newVolume > 0) {
        setPreviousVolume(newVolume)
      }
    }
  }

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen()
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }

  const handleTheaterMode = () => {
    setIsTheaterMode(!isTheaterMode)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("msfullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("msfullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleProgressClick = (e) => {
    if (!setupComplete) {
      alert("Please set up your camera first before using video controls");
      return;
    }
    
    const progressBar = progressRef.current
    const position = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
    const video = document.getElementById("backgroundVideo")

    if (video) {
      video.currentTime = position * video.duration
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handlePlaybackRateChange = (rate) => {
    if (!setupComplete) {
      alert("Please set up your camera first before changing playback speed");
      return;
    }
    
    const video = document.getElementById("backgroundVideo")
    if (video) {
      video.playbackRate = rate
      setPlaybackRate(rate)
      setShowPlaybackSpeed(false)
      setShowSettings(false)
    }
  }

  const handleRewind = () => {
    if (!setupComplete) {
      alert("Please set up your camera first before using video controls");
      return;
    }
    
    const video = document.getElementById("backgroundVideo")
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10)
    }
  }

  const handleForward = () => {
    if (!setupComplete) {
      alert("Please set up your camera first before using video controls");
      return;
    }
    
    const video = document.getElementById("backgroundVideo")
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10)
    }
  }

  const suggestedVideos = [
    {
      id: 1,
      title: "Ocean Background - Part 1",
      description: "Ocean background for your video calls",
      duration: "12:34",
    },
    {
      id: 2,
      title: "Forest Background - Natural Scene",
      description: "Beautiful forest background for virtual meetings",
      duration: "18:22",
    },
    {
      id: 3,
      title: "City Skyline - Urban Background",
      description: "Urban city background for professional calls",
      duration: "24:15",
    },
    {
      id: 4,
      title: "Space Background - Galaxy View", 
      description: "Out of this world background for your calls",
      duration: "15:48",
    },
    {
      id: 5,
      title: "Beach Sunset - Relaxing Background",
      description: "Calming beach sunset for your meetings",
      duration: "21:09",
    },
  ]

  const playbackSpeeds = [
    { value: 0.25, label: "0.25" },
    { value: 0.5, label: "0.5" },
    { value: 0.75, label: "0.75" },
    { value: 1, label: "Normal" },
    { value: 1.25, label: "1.25" },
    { value: 1.5, label: "1.5" },
    { value: 1.75, label: "1.75" },
    { value: 2, label: "2" },
  ]

  const settingsOptions = [
    { id: "quality", label: "Quality", value: "1080p" },
    { id: "speed", label: "Playback speed", value: playbackRate === 1 ? "Normal" : `${playbackRate}x` },
    { id: "autoplay", label: "Autoplay", value: "On" },
  ]

  return (
    <Layout>
      <div className="ar-container">
        <Header />
        {error ? (
          <div className="error-message">{error}</div>
        ) : !isInitialized ? (
          <div className="setup-container">
            <button 
              className="setup-button"
              onClick={initializeWebcam}
            >
              Start Camera
            </button>
          </div>
        ) : (
          <div className={`cerdikia-container ${isTheaterMode ? "theater-mode" : ""}`}>
            <div className="cerdikia-content">
              <div className={`cerdikia-player-container ${isTheaterMode ? "theater-mode" : ""}`}>
                {!setupComplete && (
                  <div className="camera-setup-overlay">
                    <div className="camera-setup-container">
                      <h2>Camera Setup Required</h2>
                      <p>You need to set up your camera before using the video background player.</p>
                      {webcamError && (
                        <div className="webcam-error-message">
                          <p>{webcamError}</p>
                        </div>
                      )}
                      <button 
                        className="setup-camera-button" 
                        onClick={initializeWebcam}
                      >
                        {webcamError ? "Try Again" : "Set Up Camera"}
                      </button>
                    </div>
                  </div>
                )}
                
                <div ref={containerRef} className="cerdikia-player" onMouseMove={handleMouseMove}>
                  <div className="video-background-container">
                    {/* Background Video */}
                    <video
                      id="backgroundVideo"
                      ref={backgroundVideoRef}
                      className="background-video"
                      src="/videos/oceannn.mp4"
                      preload="auto"
                      loop
                      muted={isMuted}
                      playsInline={true}
                      webkit-playsinline="true"
                      crossOrigin="anonymous"
                    ></video>
                    
                    {/* Webcam Overlay */}
                    <div className="webcam-container">
                    <video 
                        ref={webcamRef}
                        className="webcam-video"
                        autoPlay
                        playsInline
                        muted
                        style={{ display: hasWebcamPermission ? "block" : "none" }}
                        onLoadedMetadata={() => console.log("Webcam video metadata loaded")}
                        onError={(e) => {
                          console.error("Webcam video element error:", e);
                          setWebcamError("Error with webcam playback");
                          setHasWebcamPermission(false);
                          setSetupComplete(false);
                        }}
                      />
                    </div>
                  </div>

                  {/* YouTube-style controls overlay */}
                  <div className={`cerdikia-controls ${showControls ? "visible" : "hidden"}`}>
                    {/* Progress bar */}
                    <div className="progress-container">
                      <div ref={progressRef} className="progress-bar" onClick={handleProgressClick}>
                        <div className="progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }}>
                          <div className="progress-handle"></div>
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="controls-row">
                      <div className="controls-left">
                        <button onClick={handlePlayPause} className="control-button">
                          {isPlaying ? (
                            <svg viewBox="0 0 24 24" className="control-icon">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="control-icon">
                              <path d="M8 5v14l11-7z"></path>
                            </svg>
                          )}
                        </button>

                        <button onClick={handleRewind} className="control-button">
                          <svg viewBox="0 0 24 24" className="control-icon">
                            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
                          </svg>
                        </button>

                        <button onClick={handleForward} className="control-button">
                          <svg viewBox="0 0 24 24" className="control-icon">
                            <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"></path>
                          </svg>
                        </button>

                        <div
                          className="volume-container"
                          onMouseEnter={() => setShowVolume(true)}
                          onMouseLeave={() => setShowVolume(false)}
                        >
                          <button onClick={handleMuteToggle} className="control-button">
                            {volume === 0 ? (
                              <svg viewBox="0 0 24 24" className="control-icon">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                              </svg>
                            ) : volume < 50 ? (
                              <svg viewBox="0 0 24 24" className="control-icon">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" className="control-icon">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                              </svg>
                            )}
                          </button>

                          {showVolume && (
                            <div className="volume-slider-container">
                              <input
                                ref={volumeRef}
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                              />
                            </div>
                          )}
                        </div>

                        <div className="time-display">
                          <span>{formatTime(currentTime)}</span>
                          <span> / </span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      <div className="controls-right">
                        <div className="settings-container">
                          <button onClick={() => setShowSettings(!showSettings)} className="control-button">
                            <svg viewBox="0 0 24 24" className="control-icon">
                              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                            </svg>
                          </button>

                          {showSettings && (
                            <div className="settings-dropdown">
                              <div className="settings-menu">
                                {settingsOptions.map((option) => (
                                  <div
                                    key={option.id}
                                    className="settings-item"
                                    onClick={() => {
                                      if (option.id === "speed") {
                                        setShowPlaybackSpeed(true)
                                      }
                                    }}
                                  >
                                    <span className="settings-label">{option.label}</span>
                                    <span className="settings-value">{option.value}</span>
                                    {option.id === "speed" && <span className="settings-arrow">›</span>}
                                  </div>
                                ))}
                              </div>

                              {showPlaybackSpeed && (
                                <div className="playback-speed-menu">
                                  <div className="settings-header" onClick={() => setShowPlaybackSpeed(false)}>
                                    <span className="settings-back">‹</span>
                                    <span>Playback speed</span>
                                  </div>
                                  {playbackSpeeds.map((speed) => (
                                    <div
                                      key={speed.value}
                                      className={`settings-item ${playbackRate === speed.value ? "active" : ""}`}
                                      onClick={() => handlePlaybackRateChange(speed.value)}
                                    >
                                      <span className="settings-label">{speed.label}</span>
                                      {playbackRate === speed.value && <span className="settings-check">✓</span>}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <button onClick={handleTheaterMode} className="control-button">
                          <svg viewBox="0 0 24 24" className="control-icon">
                            <path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"></path>
                          </svg>
                        </button>

                        <button onClick={handleFullscreenToggle} className="control-button">
                          {isFullscreen ? (
                            <svg viewBox="0 0 24 24" className="control-icon">
                              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="control-icon">
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="video-info-section">
                  <h1 className="video-title">Video Background for Web Meetings</h1>
                  <p className="video-description">
                    Use this beautiful ocean video as your webcam background. Perfect for virtual meetings, video calls, 
                    or online presentations. The video plays behind your webcam feed like a Zoom virtual background.
                  </p>
                </div>
              </div>

              <div className="cerdikia-sidebar">
                <div className="suggested-videos">
                  {suggestedVideos.map((video) => (
                    <div key={video.id} className="suggested-video">
                      <div className="video-thumbnail">
                        <div className="thumbnail-duration">{video.duration}</div>
                        <div className="thumbnail-overlay">
                          <div className="play-icon">▶</div>
                        </div>
                        <video src="/videos/oceannn.mp4" className="thumbnail-video" muted></video>
                      </div>

                      <div className="video-details">
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-description">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}