"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function BallTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const numBalls = 20 // Reduced number of balls for minimalism
    const balls: { element: HTMLDivElement; x: number; y: number; scale: number }[] = []

    // Create balls
    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement("div")
      ball.classList.add("ball")
      container.appendChild(ball)
      balls.push({ element: ball, x: 0, y: 0, scale: 1 })
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    document.addEventListener("mousemove", handleMouseMove)

    function animate() {
      let prevX = mouseX
      let prevY = mouseY

      balls.forEach((ball, index) => {
        const dx = prevX - ball.x
        const dy = prevY - ball.y

        ball.x += dx * 0.15
        ball.y += dy * 0.15

        const distance = Math.sqrt(dx * dx + dy * dy)
        ball.scale = Math.max(0.3, 1 - distance / 100)

        // Simplified ball styling - just white with opacity
        ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px) scale(${ball.scale})`

        prevX = ball.x
        prevY = ball.y
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      balls.forEach((ball) => ball.element.remove())
    }
  }, [])

  const navigateToCatBreak = () => {
    router.push("/cat-break")
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden cursor-none bg-black">
      <div className="subtle-text">im not gay tho</div>

      <div className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="mb-8">
          <h1 className="text-white text-7xl font-light tracking-widest">uefy</h1>
        </div>

        <div className="flex flex-col gap-6 items-center pointer-events-auto">
          <a href="https://x.com/uefy0" target="_blank" rel="noopener noreferrer" className="minimal-link">
            my portfolio
          </a>

          <a
            href="https://csfloat.com/stall/76561198838298558"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-link"
          >
            CSFloat Stall
          </a>

          <button onClick={navigateToCatBreak} className="minimal-link cat-break-link">
            cat break
          </button>
        </div>
      </div>
      <style jsx global>{`
        .ball {
          position: fixed;
          width: 12px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        
        .subtle-text {
          position: fixed;
          bottom: 10px;
          right: 10px;
          color: rgba(20, 20, 20, 0.4);
          font-size: 10px;
          opacity: 0.1;
          user-select: none;
          z-index: 1;
        }
        
        .minimal-link {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          letter-spacing: 2px;
          text-transform: lowercase;
          padding: 8px 0;
          position: relative;
          transition: all 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .minimal-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .minimal-link:hover {
          color: white;
        }
        
        .minimal-link:hover::after {
          width: 100%;
        }
        
        .cat-break-link {
          color: rgba(255, 182, 193, 0.8);
        }
        
        .cat-break-link::after {
          background-color: #FFB6C1;
        }
      `}</style>
    </div>
  )
}
