"use client"

import { useEffect, useState, useRef } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize2,
  Settings,
  Camera,
  Eye,
  Move3d,
  Compass,
  LayoutIcon,
  Monitor,
  Share2,
  Download,
  Info,
  ChevronRight,
} from "lucide-react"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import "./ARPage.css"

export default function ARPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [volume, setVolume] = useState(50)
  const [showControls, setShowControls] = useState(true)
  const [arMode, setArMode] = useState("camera") // 'camera', 'vr', '3d'
  const [showInfo, setShowInfo] = useState(false)
  const [viewMode, setViewMode] = useState("default") // 'default', 'sideBySide', 'theater'
  const [quality, setQuality] = useState("auto")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showCameraSetup, setShowCameraSetup] = useState(false)
  const [hasWebcamPermission, setHasWebcamPermission] = useState(false)

  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const progressRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  const webcamRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration)
      })

      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime)
      })

      video.addEventListener("ended", () => {
        setIsPlaying(false)
      })

      // Listen for fullscreen changes
      document.addEventListener("fullscreenchange", handleFullscreenChange)

      return () => {
        video.removeEventListener("loadedmetadata", () => {})
        video.removeEventListener("timeupdate", () => {})
        video.removeEventListener("ended", () => {})
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
    }
  }, [])

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement)
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const handleProgressChange = (e) => {
    const progress = progressRef.current
    const position = (e.clientX - progress.getBoundingClientRect().left) / progress.offsetWidth
    if (videoRef.current) {
      videoRef.current.currentTime = position * videoRef.current.duration
    }
  }

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
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

  const handleArModeChange = (mode) => {
    setArMode(mode)
    if (mode === "camera" && !hasWebcamPermission) {
      setShowCameraSetup(true)
    }
  }

  const setupWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream
        setHasWebcamPermission(true)
        setShowCameraSetup(false)
      }
    } catch (error) {
      console.error("Error accessing webcam:", error)
      setHasWebcamPermission(false)
    }
  }

  const handleViewModeChange = (mode) => {
    setViewMode(mode)
    if (mode === "theater") {
      videoContainerRef.current.requestFullscreen()
    }
  }

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality)
    // Implementation for quality change would go here
  }

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
    }
  }

  const suggestedRooms = [
    {
      id: 1,
      title: "Ruang Kelas Interaktif 360°",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "05:30",
      description:
        "Eksplorasi ruang kelas dengan teknologi AR yang memungkinkan interaksi dengan objek pembelajaran 3D.",
    },
    {
      id: 2,
      title: "Laboratorium Sains Virtual",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "08:45",
      description: "Simulasi laboratorium dengan peralatan virtual dan eksperimen interaktif.",
    },
    {
      id: 3,
      title: "Perpustakaan Digital AR",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "06:20",
      description: "Jelajahi perpustakaan dengan konten digital yang dapat diakses melalui pemindaian AR.",
    },
  ]

  return (
    <Layout>
      <div className="ar-container">
        <Header />
        <div className="ar-main">
          <div className="ar-header">
            <h1 className="ar-title">Ruang Kelas Pintar dengan AR</h1>
            <p className="ar-subtitle">
              Jelajahi ruang kelas masa depan dengan teknologi Augmented Reality yang interaktif
            </p>
          </div>

          <div className="ar-content">
            <div className="ar-player-section">
              <div ref={videoContainerRef} className={`ar-player ${viewMode}`} onMouseMove={handleMouseMove}>
                {arMode === "camera" && (
                  <div className="ar-overlay">
                    <video ref={webcamRef} autoPlay playsInline className="webcam-video" />
                  </div>
                )}

                <video ref={videoRef} className="main-video" src="/videos/oceannn.mp4" preload="metadata" />

                {showCameraSetup && (
                  <div className="camera-setup-overlay">
                    <div className="camera-setup-container">
                      <h2>Izin Kamera Diperlukan</h2>
                      <p>
                        Untuk menggunakan fitur AR, kami memerlukan akses ke kamera perangkat Anda. Ini akan
                        memungkinkan Anda untuk berinteraksi dengan konten AR.
                      </p>
                      <button className="setup-camera-button" onClick={setupWebcam}>
                        Aktifkan Kamera
                      </button>
                    </div>
                  </div>
                )}

                <div className={`video-controls ${showControls ? "show" : ""}`}>
                  <div className="progress-bar" ref={progressRef} onClick={handleProgressChange}>
                    <div className="progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }} />
                  </div>

                  <div className="controls-main">
                    <div className="controls-left">
                      <button className="control-button" onClick={handlePlayPause}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>

                      <div className="volume-control">
                        <button className="control-button" onClick={handleMuteToggle}>
                          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                        />
                      </div>

                      <div className="time-display">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="ar-controls">
                      <button
                        className={`control-button ${arMode === "camera" ? "active" : ""}`}
                        onClick={() => handleArModeChange("camera")}
                        title="Mode Kamera AR"
                      >
                        <Camera size={20} />
                      </button>
                      <button
                        className={`control-button ${arMode === "vr" ? "active" : ""}`}
                        onClick={() => handleArModeChange("vr")}
                        title="Mode VR"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        className={`control-button ${arMode === "3d" ? "active" : ""}`}
                        onClick={() => handleArModeChange("3d")}
                        title="Mode 3D"
                      >
                        <Move3d size={20} />
                      </button>
                      <button
                        className="control-button"
                        onClick={() => setShowInfo(!showInfo)}
                        title="Informasi Ruangan"
                      >
                        <Info size={20} />
                      </button>
                    </div>

                    <div className="controls-right">
                      <button
                        className="control-button"
                        onClick={() => handleViewModeChange("sideBySide")}
                        title="Mode Side by Side"
                      >
                        <LayoutIcon size={20} />
                      </button>
                      <button
                        className="control-button"
                        onClick={() => handleViewModeChange("theater")}
                        title="Mode Theater"
                      >
                        <Monitor size={20} />
                      </button>
                      <button className="control-button" title="Bagikan">
                        <Share2 size={20} />
                      </button>
                      <button className="control-button" title="Unduh">
                        <Download size={20} />
                      </button>
                      <button
                        className="control-button"
                        onClick={() => setShowSettings(!showSettings)}
                        title="Pengaturan"
                      >
                        <Settings size={20} />
                      </button>
                      <button className="control-button" onClick={handleFullscreenToggle} title="Layar Penuh">
                        {isFullscreen ? <Minimize2 size={20} /> : <Maximize size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                {showSettings && (
                  <div className="settings-panel">
                    <div className="settings-section">
                      <h3>Kualitas</h3>
                      <select
                        value={quality}
                        onChange={(e) => handleQualityChange(e.target.value)}
                        className="settings-select"
                      >
                        <option value="auto">Otomatis</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>
                    <div className="settings-section">
                      <h3>Kecepatan Pemutaran</h3>
                      <select
                        value={playbackSpeed}
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        className="settings-select"
                      >
                        <option value="0.5">0.5x</option>
                        <option value="1">Normal</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                    </div>
                  </div>
                )}

                {showInfo && (
                  <div className="room-info-overlay">
                    <div className="room-info-container">
                      <h2>Informasi Ruangan AR</h2>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Dimensi:</span>
                          <span className="info-value">8m x 6m</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Objek Interaktif:</span>
                          <span className="info-value">12</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Mode AR:</span>
                          <span className="info-value">Marker-based & Markerless</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Kapasitas:</span>
                          <span className="info-value">30 pengguna</span>
                        </div>
                      </div>
                      <button className="close-info" onClick={() => setShowInfo(false)}>
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="ar-info-card">
                <h2 className="ar-info-title">Demo Ruang Kelas Pintar dengan AR</h2>
                <p className="ar-info-description">
                  Jelajahi ruang kelas masa depan dengan teknologi Augmented Reality. Ruangan ini dilengkapi dengan
                  berbagai fitur interaktif yang memungkinkan siswa dan guru untuk berinteraksi dengan objek
                  pembelajaran 3D, mengakses konten digital melalui pemindaian AR, dan menciptakan pengalaman belajar
                  yang lebih immersif. Cocok untuk pembelajaran STEM, seni visual, dan berbagai mata pelajaran lainnya.
                </p>
                <div className="ar-features">
                  <div className="ar-feature">
                    <div className="ar-feature-icon">
                      <Compass size={20} />
                    </div>
                    <span>Navigasi 360°</span>
                  </div>
                  <div className="ar-feature">
                    <div className="ar-feature-icon">
                      <Move3d size={20} />
                    </div>
                    <span>Objek 3D Interaktif</span>
                  </div>
                  <div className="ar-feature">
                    <div className="ar-feature-icon">
                      <Camera size={20} />
                    </div>
                    <span>AR Markerless</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ar-sidebar">
              <div className="ar-sidebar-header">
                <h3 className="ar-sidebar-title">Ruangan AR Lainnya</h3>
                <a href="#" className="ar-view-all">
                  Lihat Semua <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="ar-suggested-rooms">
                {suggestedRooms.map((room) => (
                  <div key={room.id} className="ar-room-card">
                    <div className="ar-room-thumbnail">
                      <img src={room.thumbnail || "/placeholder.svg"} alt={room.title} />
                      <span className="ar-room-duration">{room.duration}</span>
                    </div>
                    <div className="ar-room-details">
                      <h4 className="ar-room-title">{room.title}</h4>
                      <p className="ar-room-description">{room.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
