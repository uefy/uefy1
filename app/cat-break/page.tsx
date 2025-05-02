"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function CatBreak() {
  const router = useRouter()
  const [currentCatImage, setCurrentCatImage] = useState("")
  const [showMyCat, setShowMyCat] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const recentCatsRef = useRef<string[]>([])

  const catImages = [
    "https://i.imgur.com/Sy1VMZs.png",
    "https://i.imgur.com/ZfcjHYq.png",
    "https://i.imgur.com/c7XLHlY.png",
    "https://i.imgur.com/tCW2Rul.png",
    "https://i.imgur.com/8ZRyrjp.png",
    "https://i.imgur.com/FXvE2Hq.png",
    "https://i.imgur.com/OEIYtiy.png",
    "https://i.imgur.com/qUca1oU.png",
    "https://i.imgur.com/8cCMPjV.png",
    "https://i.imgur.com/dlv2Q9Q.png",
    "https://i.imgur.com/egL0RPo.png",
    "https://i.imgur.com/pxQBR25.png",
    "https://i.imgur.com/dVeiqRr.png",
    "https://i.imgur.com/HW25Rnr.png",
    "https://i.imgur.com/TGs1Pup.png",
    "https://i.imgur.com/vciiLic.png",
    "https://i.imgur.com/qAWtOvI.png",
    "https://i.imgur.com/xNO6Xft.png",
    "https://i.imgur.com/KrYJtYq.png",
    "https://i.imgur.com/c9gx73Q.png",
    "https://i.imgur.com/U0TNTth.png",
    "https://i.imgur.com/pemeVuK.png",
    "https://i.imgur.com/G71ofcw.png",
    "https://i.imgur.com/cJThZkc.png",
    "https://i.imgur.com/FSuJ1lG.png",
    "https://i.imgur.com/B4wvGGO.png",
    "https://i.imgur.com/WqpOrqV.png",
    "https://i.imgur.com/axIUshT.png",
    "https://i.imgur.com/mzYxPVV.png",
    "https://i.imgur.com/6IxP6yd.png",
    "https://i.imgur.com/rVEvzbY.png",
    "https://i.imgur.com/cJXVNeN.png",
    "https://i.imgur.com/HaeN4KV.png",
    "https://i.imgur.com/4Y5Nxni.png",
    "https://i.imgur.com/LYDpXU9.png",
    "https://i.imgur.com/9Qwm5n7.png",
    "https://i.imgur.com/eQofdXu.png",
    "https://i.imgur.com/a65LNe7.png",
    "https://i.imgur.com/VwgV3NX.png",
    "https://i.imgur.com/O0vXiQ6.png",
    "https://i.imgur.com/EOFBoKM.png",
    "https://i.imgur.com/r9pv2Er.png",
    "https://i.imgur.com/t68uGAP.png",
    "https://i.imgur.com/BFsZWjY.png",
    "https://i.imgur.com/oy0FMtT.png",
    "https://i.imgur.com/0hQOD35.png",
    "https://i.imgur.com/pUzi0jY.png",
    "https://i.imgur.com/oHtKpJP.png",
    "https://i.imgur.com/zaDgW5O.png",
    "https://i.imgur.com/xx8XE6Z.jpeg",
    "https://i.imgur.com/NwtcShY.jpeg",
    "https://i.imgur.com/agp6Oa8.jpeg",
    "https://i.imgur.com/bNwcAKc.jpeg",
    "https://i.imgur.com/l962PW3.jpeg",
    "https://i.imgur.com/SLwJwhX.png",
    "https://i.imgur.com/YcmbKmL.png",
    "https://i.imgur.com/KkkXM5u.png",
    "https://i.imgur.com/u6I7yaG.png",
  ]

  // Get a truly random cat that hasn't been shown in the last 10 selections
  const getRandomCat = () => {
    setIsLoading(true)

    // Filter out recently shown cats
    const availableCats = catImages.filter((img) => !recentCatsRef.current.includes(img))

    // If we've filtered too many, reset (this shouldn't happen often)
    const catsToChooseFrom = availableCats.length > 0 ? availableCats : catImages

    // Get random cat from available options
    const randomIndex = Math.floor(Math.random() * catsToChooseFrom.length)
    const newImage = catsToChooseFrom[randomIndex]

    // Update recent cats list
    recentCatsRef.current.push(newImage)
    if (recentCatsRef.current.length > 10) {
      recentCatsRef.current.shift() // Remove oldest cat from history
    }

    setCurrentCatImage(newImage)

    // Check if the image is a JPEG (user's cat)
    if (newImage.endsWith(".jpeg")) {
      setShowMyCat(true)
      setShowConfetti(true)

      // Hide the "THIS IS MY CAT" text after 2 seconds (reduced from 3)
      setTimeout(() => {
        setShowMyCat(false)
      }, 2000)
    } else {
      setShowMyCat(false)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Load initial cat image
  useEffect(() => {
    getRandomCat()
  }, [])

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Confetti effect
    if (showConfetti) {
      createConfetti()
      setShowConfetti(false)
    }
  }, [showConfetti])

  // Function to create confetti effect with more particles
  const createConfetti = () => {
    const confettiCount = 400 // Increased from 200
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#ffa500"]

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.classList.add("confetti")

      // Random position, color, and animation delay
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const color = colors[Math.floor(Math.random() * colors.length)]
      const animationDelay = Math.random() * 3 // Reduced from 5

      confetti.style.left = `${x}px`
      confetti.style.top = `${y}px`
      confetti.style.backgroundColor = color
      confetti.style.animationDelay = `${animationDelay}s`

      // Random size for more variety
      const size = 5 + Math.random() * 10
      confetti.style.width = `${size}px`
      confetti.style.height = `${size}px`

      document.body.appendChild(confetti)

      // Remove confetti after animation (reduced from 5000ms)
      setTimeout(() => {
        confetti.remove()
      }, 3000)
    }
  }

  return (
    <div className={`cat-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="cat-container">
        <button onClick={() => router.back()} className="back-button">
          ← Back
        </button>

        <h1 className="cat-title">Cat Break</h1>

        <div className="cat-image-wrapper">
          {isLoading && <div className="loading-spinner"></div>}
          <img
            src={currentCatImage || "/placeholder.svg"}
            alt="Random Cat"
            className={`cat-image ${isLoading ? "loading" : "loaded"}`}
            onLoad={handleImageLoad}
          />
          {showMyCat && (
            <div className="my-cat-overlay">
              <span className="my-cat-text">THIS IS MY CAT</span>
            </div>
          )}
        </div>

        <button onClick={getRandomCat} className="cat-button">
          Show Another Cat
        </button>
      </div>

      {/* Sticky Note with Updated Text */}
      <div className="sticky-note">
        <div className="sticky-note-content">
          <p>
            If you would like to see photos of your own cat or cats you find funny, you can reach me via Discord. If you
            would like to donate, I would be very happy 🥺👉👈
          </p>
          <p className="discord-username">
            my username is <strong>uefyy</strong>
          </p>
          <div className="sticky-note-tape sticky-note-tape-top"></div>
          <div className="sticky-note-tape sticky-note-tape-bottom"></div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        
        .cat-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #FFF5F7, #FFE5EB);
          padding: 20px;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .cat-page.dark-mode {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
        }
        
        .dark-mode-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 100;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .dark-mode .dark-mode-toggle {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .cat-container {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
          max-width: 600px;
          width: 90%;
          text-align: center;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        
        .dark-mode .cat-container {
          background: #2a2a4a;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: none;
          border: none;
          color: #FF69B4;
          font-size: 16px;
          cursor: pointer;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          transition: transform 0.2s;
        }
        
        .dark-mode .back-button {
          color: #FF9ED2;
        }
        
        .back-button:hover {
          transform: translateX(-3px);
        }
        
        .cat-title {
          color: #FF69B4;
          font-size: 36px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.2);
        }
        
        .dark-mode .cat-title {
          color: #FF9ED2;
          text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.4);
        }
        
        .cat-image-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
          transition: all 0.3s ease;
        }
        
        .dark-mode .cat-image-wrapper {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          background-color: #1e1e3f;
        }
        
        .cat-image {
          max-width: 100%;
          display: block;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .cat-image.loading {
          opacity: 0;
        }
        
        .cat-image.loaded {
          opacity: 1;
        }
        
        .loading-spinner {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 182, 193, 0.3);
          border-radius: 50%;
          border-top-color: #FF69B4;
          animation: spin 1s linear infinite;
        }
        
        .dark-mode .loading-spinner {
          border: 4px solid rgba(255, 182, 193, 0.1);
          border-top-color: #FF9ED2;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .cat-button {
          background: linear-gradient(135deg, #FFB6C1, #FF69B4);
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(255, 105, 180, 0.3);
          outline: none;
          margin-top: 15px;
        }
        
        .dark-mode .cat-button {
          background: linear-gradient(135deg, #FF9ED2, #FF69B4);
          box-shadow: 0 4px 10px rgba(255, 105, 180, 0.5);
        }
        
        .cat-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(255, 105, 180, 0.4);
        }
        
        .cat-button:active {
          transform: translateY(1px);
        }
        
        .my-cat-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          animation: fadeIn 0.5s ease;
        }
        
        .my-cat-text {
          font-family: 'Impact', sans-serif;
          font-size: 42px;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 105, 180, 0.8);
          letter-spacing: 2px;
          animation: pulse 0.7s infinite alternate;
        }
        
        /* Sticky Note Styles */
        .sticky-note {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%) rotate(3deg);
          width: 220px;
          z-index: 10;
        }
        
        .sticky-note-content {
          background: #FFFF88;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          position: relative;
          transform: rotate(0deg);
          transition: transform 0.3s ease;
        }
        
        .dark-mode .sticky-note-content {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        }
        
        .sticky-note-content:hover {
          transform: rotate(-2deg) scale(1.03);
        }
        
        .sticky-note-tape {
          position: absolute;
          width: 80px;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.6);
          opacity: 0.7;
          left: 50%;
          transform: translateX(-50%) rotate(2deg);
        }
        
        .sticky-note-tape-top {
          top: -15px;
        }
        
        .sticky-note-tape-bottom {
          bottom: -15px;
          transform: translateX(-50%) rotate(-2deg);
        }
        
        .discord-username {
          margin-top: 10px;
          font-weight: bold;
        }
        
        .discord-username strong {
          color: #5865F2;
          font-size: 16px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        
        /* Confetti Animation - More particles, shorter duration */
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          pointer-events: none;
          opacity: 0;
          animation: confettiFall 3s ease forwards;
          z-index: 1000;
          border-radius: 50%;
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 900px) {
          .sticky-note {
            position: static;
            transform: none;
            width: 90%;
            max-width: 600px;
            margin: 20px auto 0;
          }
          
          .cat-page {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
