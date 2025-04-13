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
  Clock,
  Users,
  Sparkles,
  BookOpen,
  Star,
  GraduationCap,
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
  const [activeTab, setActiveTab] = useState("all")

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

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const suggestedRooms = [
    {
      id: 1,
      title: "Ruang Kelas Interaktif 360°",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "05:30",
      description:
        "Eksplorasi ruang kelas dengan teknologi AR yang memungkinkan interaksi dengan objek pembelajaran 3D.",
      students: "1.2k",
      rating: 4.8,
      color: "bg-gradient-1",
    },
    {
      id: 2,
      title: "Laboratorium Sains Virtual",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "08:45",
      description: "Simulasi laboratorium dengan peralatan virtual dan eksperimen interaktif.",
      students: "980",
      rating: 4.6,
      color: "bg-gradient-2",
    },
    {
      id: 3,
      title: "Perpustakaan Digital AR",
      thumbnail: "/placeholder.svg?height=90&width=160",
      duration: "06:20",
      description: "Jelajahi perpustakaan dengan konten digital yang dapat diakses melalui pemindaian AR.",
      students: "750",
      rating: 4.5,
      color: "bg-gradient-3",
    },
  ]

  const arFeatures = [
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Navigasi 360°",
      description: "Jelajahi ruangan dari berbagai sudut pandang",
    },
    {
      icon: <Move3d className="h-5 w-5" />,
      title: "Objek 3D Interaktif",
      description: "Berinteraksi dengan objek pembelajaran 3D",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "AR Markerless",
      description: "Pengalaman AR tanpa marker fisik",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Kolaborasi Multi-pengguna",
      description: "Belajar bersama dalam ruang virtual yang sama",
    },
  ]

  const arStats = [
    { label: "Dimensi Ruangan", value: "8m x 6m" },
    { label: "Objek Interaktif", value: "12" },
    { label: "Kapasitas", value: "30 pengguna" },
    { label: "Mode AR", value: "Marker-based & Markerless" },
  ]

  return (
    <Layout>
      <div className="ar-container">
        <Header />
        <main className="ar-main">
          {/* Hero Section */}
          <div className="ar-hero">
            <div className="ar-hero-content">
              <div className="ar-badge">
                <Sparkles className="h-4 w-4 mr-1" />
                <span>Teknologi Pembelajaran</span>
              </div>
              <h1 className="ar-hero-title">
                Ruang Kelas Pintar dengan <span className="highlight">AR</span>
              </h1>
              <p className="ar-hero-subtitle">
                Jelajahi ruang kelas masa depan dengan teknologi Augmented Reality yang interaktif dan immersif
              </p>

              <div className="ar-hero-stats">
                <div className="ar-stat-item">
                  <div className="ar-stat-icon">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="ar-stat-info">
                    <h3 className="ar-stat-value">2.5k+</h3>
                    <p className="ar-stat-label">Pengguna</p>
                  </div>
                </div>
                <div className="ar-stat-item">
                  <div className="ar-stat-icon">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="ar-stat-info">
                    <h3 className="ar-stat-value">4.8</h3>
                    <p className="ar-stat-label">Rating</p>
                  </div>
                </div>
                <div className="ar-stat-item">
                  <div className="ar-stat-icon">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="ar-stat-info">
                    <h3 className="ar-stat-value">15+</h3>
                    <p className="ar-stat-label">Materi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ar-hero-decoration">
              <div className="decoration-element element-1"></div>
              <div className="decoration-element element-2"></div>
              <div className="decoration-element element-3"></div>
              <div className="decoration-element element-4"></div>
            </div>
          </div>

          <div className="ar-content-grid">
            {/* Main Content */}
            <div className="ar-content-main">
              <div className="ar-player-wrapper">
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
                          {arStats.map((stat, index) => (
                            <div className="info-item" key={index}>
                              <span className="info-label">{stat.label}:</span>
                              <span className="info-value">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                        <button className="close-info" onClick={() => setShowInfo(false)}>
                          Tutup
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ar-player-actions">
                  <button className="ar-action-button">
                    <Share2 className="h-5 w-5 mr-2" />
                    Bagikan
                  </button>
                  <button className="ar-action-button">
                    <Download className="h-5 w-5 mr-2" />
                    Unduh
                  </button>
                  <button className="ar-action-button">
                    <Info className="h-5 w-5 mr-2" />
                    Info
                  </button>
                </div>
              </div>

              <div className="ar-info-section">
                <div className="ar-info-header">
                  <div className="ar-info-title-wrapper">
                    <h2 className="ar-info-title">Demo Ruang Kelas Pintar dengan AR</h2>
                    <div className="ar-info-meta">
                      <div className="ar-info-meta-item">
                        <Clock className="h-4 w-4" />
                        <span>Terakhir diperbarui: 2 hari yang lalu</span>
                      </div>
                      <div className="ar-info-meta-item">
                        <GraduationCap className="h-4 w-4" />
                        <span>2.5k+ Pengguna</span>
                      </div>
                    </div>
                  </div>
                  <div className="ar-info-rating">
                    <div className="ar-rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-5 w-5 ${star <= 4 ? "fill-current text-yellow-400" : ""}`} />
                      ))}
                    </div>
                    <span className="ar-rating-value">4.8</span>
                  </div>
                </div>

                <div className="ar-info-content">
                  <p className="ar-info-description">
                    Jelajahi ruang kelas masa depan dengan teknologi Augmented Reality. Ruangan ini dilengkapi dengan
                    berbagai fitur interaktif yang memungkinkan siswa dan guru untuk berinteraksi dengan objek
                    pembelajaran 3D, mengakses konten digital melalui pemindaian AR, dan menciptakan pengalaman belajar
                    yang lebih immersif. Cocok untuk pembelajaran STEM, seni visual, dan berbagai mata pelajaran
                    lainnya.
                  </p>

                  <div className="ar-features-grid">
                    {arFeatures.map((feature, index) => (
                      <div className="ar-feature-card" key={index}>
                        <div className="ar-feature-icon-wrapper">{feature.icon}</div>
                        <div className="ar-feature-content">
                          <h3 className="ar-feature-title">{feature.title}</h3>
                          <p className="ar-feature-description">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ar-related-section">
                <div className="section-header">
                  <div className="section-title">
                    <Camera className="section-icon" />
                    <h2>Ruangan AR Serupa</h2>
                  </div>
                  <div className="ar-filter-tabs">
                    <button
                      className={`ar-filter-tab ${activeTab === "all" ? "active" : ""}`}
                      onClick={() => handleTabChange("all")}
                    >
                      Semua
                    </button>
                    <button
                      className={`ar-filter-tab ${activeTab === "popular" ? "active" : ""}`}
                      onClick={() => handleTabChange("popular")}
                    >
                      Populer
                    </button>
                    <button
                      className={`ar-filter-tab ${activeTab === "new" ? "active" : ""}`}
                      onClick={() => handleTabChange("new")}
                    >
                      Terbaru
                    </button>
                  </div>
                </div>

                <div className="ar-rooms-grid">
                  {suggestedRooms.map((room) => (
                    <div key={room.id} className="ar-room-card-large">
                      <div className={`ar-room-thumbnail-large ${room.color}`}>
                        <img src={room.thumbnail || "/placeholder.svg"} alt={room.title} />
                        <div className="ar-room-overlay">
                          <button className="ar-room-play-button">
                            <Play className="h-6 w-6" />
                          </button>
                        </div>
                        <span className="ar-room-duration">
                          <Clock className="h-3 w-3 mr-1" />
                          {room.duration}
                        </span>
                      </div>
                      <div className="ar-room-content">
                        <h3 className="ar-room-title">{room.title}</h3>
                        <p className="ar-room-description">{room.description}</p>
                        <div className="ar-room-meta">
                          <div className="ar-room-rating">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span>{room.rating}</span>
                          </div>
                          <div className="ar-room-students">
                            <GraduationCap className="h-4 w-4" />
                            <span>{room.students} Siswa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="ar-sidebar">
              <div className="ar-sidebar-section">
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

              <div className="ar-sidebar-section">
                <div className="ar-sidebar-header">
                  <h3 className="ar-sidebar-title">Statistik Penggunaan</h3>
                </div>
                <div className="ar-stats-container">
                  <div className="ar-stats-item">
                    <div className="ar-stats-info">
                      <h4>Total Waktu Penggunaan</h4>
                      <p className="ar-stats-value">12 jam 45 menit</p>
                    </div>
                    <div className="ar-stats-chart">
                      <div className="chart-bar-container">
                        {[30, 45, 60, 40, 75, 50, 20].map((value, index) => (
                          <div className="chart-bar-wrapper" key={index}>
                            <div className="chart-bar" style={{ height: `${value}%` }}></div>
                            <span className="chart-label">{["S", "S", "R", "K", "J", "S", "M"][index]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ar-stats-item">
                    <div className="ar-stats-info">
                      <h4>Objek Interaktif Ditemukan</h4>
                      <div className="ar-completion-info">
                        <p className="ar-stats-value">8/12</p>
                        <span className="ar-completion-percentage">67%</span>
                      </div>
                    </div>
                    <div className="ar-completion-bar">
                      <div className="ar-completion-fill" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
