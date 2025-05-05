"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function CatBreak() {
  const router = useRouter()
  const [currentCatImage, setCurrentCatImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [allPhotosViewed, setAllPhotosViewed] = useState(false)
  const viewedCatsRef = useRef<Set<string>>(new Set())

  const catImages = [
    // Original images
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

    // New images
    "https://i.imgur.com/iTmpJes.jpeg",
    "https://i.imgur.com/J5UWrrS.jpeg",
    "https://i.imgur.com/4reb7zp.jpeg",
    "https://i.imgur.com/Cl8MEq8.jpeg",
    "https://i.imgur.com/VX13zDB.jpeg",
    "https://i.imgur.com/RumC3ou.jpeg",
    "https://i.imgur.com/Fu3u7Hd.jpeg",
    "https://i.imgur.com/yVYOVZe.jpeg",
    "https://i.imgur.com/INgSwlH.jpeg",
    "https://i.imgur.com/Ajt2imi.jpeg",
    "https://i.imgur.com/cnwCp9k.jpeg",
    "https://i.imgur.com/lFG1MmV.jpeg",
    "https://i.imgur.com/fA3Twhu.jpeg",
    "https://i.imgur.com/xYRzqNM.jpeg",
    "https://i.imgur.com/QXs6HJn.jpeg",
    "https://i.imgur.com/3GIEfYG.jpeg",
    "https://i.imgur.com/1flevgW.jpeg",
    "https://i.imgur.com/HnDwXIi.jpeg",
    "https://i.imgur.com/IgIPNM9.jpeg",
    "https://i.imgur.com/LQzmh6r.jpeg",
    "https://i.imgur.com/UgdVUDJ.jpeg",
    "https://i.imgur.com/tyTv0IG.jpeg",
    "https://i.imgur.com/HjjpbU7.jpeg",
    "https://i.imgur.com/9SZahO7.jpeg",
    "https://i.imgur.com/2RcSycE.jpeg",
    "https://i.imgur.com/MdIvRsm.jpeg",
    "https://i.imgur.com/IQCUgOG.jpeg",
    "https://i.imgur.com/RhjE2S5.jpeg",
    "https://i.imgur.com/gICP3Pn.jpeg",
    "https://i.imgur.com/ey12fSx.jpeg",
    "https://i.imgur.com/8ZMx4Y3.jpeg",
    "https://i.imgur.com/7lzyzHQ.jpeg",
    "https://i.imgur.com/UC4FycF.jpeg",
    "https://i.imgur.com/AkQa4BZ.jpeg",
    "https://i.imgur.com/dKfjWh3.jpeg",
    "https://i.imgur.com/ZoM8vNN.jpeg",
    "https://i.imgur.com/YwGUov8.jpeg",
    "https://i.imgur.com/XF2bOlE.jpeg",
    "https://i.imgur.com/R6CM4xL.jpeg",
    "https://i.imgur.com/z7cS6XS.jpeg",
    "https://i.imgur.com/E4qPFmL.jpeg",
    "https://i.imgur.com/TAPYUEX.jpeg",
  ]

  // Get a random cat that hasn't been viewed yet
  const getRandomCat = () => {
    setIsLoading(true)

    // Check if all photos have been viewed
    if (viewedCatsRef.current.size >= catImages.length) {
      // All photos have been viewed, show completion message
      setAllPhotosViewed(true)
      return
    }

    // Get unviewed cats
    const unviewedCats = catImages.filter((img) => !viewedCatsRef.current.has(img))

    // Get random cat from unviewed options
    const randomIndex = Math.floor(Math.random() * unviewedCats.length)
    const newImage = unviewedCats[randomIndex]

    // Add to viewed cats
    viewedCatsRef.current.add(newImage)
    setCurrentCatImage(newImage)

    // If this was the last unviewed cat, set the flag
    if (viewedCatsRef.current.size >= catImages.length) {
      setAllPhotosViewed(true)
    }
  }

  // Reset all viewed cats and start over
  const resetCats = () => {
    viewedCatsRef.current.clear()
    setAllPhotosViewed(false)
    getRandomCat()
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

  // Calculate progress
  const progress = Math.round((viewedCatsRef.current.size / catImages.length) * 100)

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

        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            {viewedCatsRef.current.size} / {catImages.length} cats viewed
          </span>
        </div>

        <div className="cat-image-wrapper">
          {isLoading && <div className="loading-spinner"></div>}
          {allPhotosViewed ? (
            <div className="completion-message">
              <h2>All photos have been shown!</h2>
              <p>
                New photos are added every week. If you would like to submit your own, please contact me on Discord.
              </p>
              <button onClick={resetCats} className="reset-button">
                Start Over
              </button>
            </div>
          ) : (
            <img
              src={currentCatImage || "/placeholder.svg"}
              alt="Random Cat"
              className={`cat-image ${isLoading ? "loading" : "loaded"}`}
              onLoad={handleImageLoad}
            />
          )}
        </div>

        {!allPhotosViewed && (
          <button onClick={getRandomCat} className="cat-button">
            Show Another Cat
          </button>
        )}
      </div>

      {/* Sticky Note with Updated Text */}
      <div className="sticky-note">
        <div className="sticky-note-content">
          <p>If you would like to see photos of your own cat or cats you find funny, you can reach me via Discord.</p>
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
          color: #fff;
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
        
        /* Progress bar styles */
        .progress-container {
          width: 100%;
          height: 20px;
          background-color: #f0f0f0;
          border-radius: 10px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .dark-mode .progress-container {
          background-color: #3a3a5a;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #FFB6C1, #FF69B4);
          border-radius: 10px;
          transition: width 0.5s ease;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: bold;
          color: #333;
        }
        
        .dark-mode .progress-text {
          color: #fff;
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
          min-height: 300px;
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
        
        /* Completion message styles */
        .completion-message {
          padding: 20px;
          text-align: center;
        }
        
        .completion-message h2 {
          color: #FF69B4;
          margin-bottom: 15px;
        }
        
        .dark-mode .completion-message h2 {
          color: #FF9ED2;
        }
        
        .completion-message p {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .reset-button {
          background: linear-gradient(135deg, #FFB6C1, #FF69B4);
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(255, 105, 180, 0.3);
          outline: none;
        }
        
        .dark-mode .reset-button {
          background: linear-gradient(135deg, #FF9ED2, #FF69B4);
        }
        
        .reset-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 105, 180, 0.4);
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
