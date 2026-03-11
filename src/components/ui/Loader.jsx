'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const counterRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete: () => onComplete?.()
        })
      }
    })

    // Animate the counter
    let c = 0
    const interval = setInterval(() => {
      c += Math.floor(Math.random() * 8) + 2
      if (c >= 100) { c = 100; clearInterval(interval) }
      setCount(c)
    }, 50)

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
    })

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-primary flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <p className="font-mono text-secondary text-xs tracking-widest uppercase mb-8 opacity-60">
          Initializing
        </p>
        <div className="font-display text-[clamp(3rem,10vw,8rem)] font-black text-[#e8e4df] leading-none mb-8">
          <span className="text-secondary" ref={counterRef}>{count}</span>
          <span className="text-white/20">%</span>
        </div>
        <div className="w-64 h-px bg-white/10 overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full bg-secondary origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <p className="font-body text-white/20 text-xs mt-6">Full Stack Developer Portfolio</p>
      </div>
    </div>
  )
}
