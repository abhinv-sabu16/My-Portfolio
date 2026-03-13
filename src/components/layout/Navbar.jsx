'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const timeRef = useRef(null)

  // Live time display
  useEffect(() => {
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date()
        timeRef.current.textContent = now.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        })
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Initial nav animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.8)', delay: 2.2 }
    )
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      
      const sections = navLinks.map(l => l.href.replace('#', ''))
      let maxVisibleArea = 0
      let currentActive = active

      for (let i = 0; i < sections.length; i++) {
        const id = sections[i]
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const windowHeight = window.innerHeight || document.documentElement.clientHeight
          
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(windowHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight
            currentActive = id
          }
        }
      }
      
      if (currentActive && currentActive !== active) {
        setActive(currentActive)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [active])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -20, scale: 0.95, duration: 0.3 })
    }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Unique Floating Orbital Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-6 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${scrolled ? 'top-4' : 'top-6'}`}
      >
        {/* Logo — Left */}
        <div className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border border-secondary opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[3px] rounded-full bg-secondary flex items-center justify-center">
              <span className="font-display font-black text-primary text-sm leading-none">Ø</span>
            </div>
          </div>
          <div className="block">
            <p className="font-display font-bold text-sm text-[#e8e4df] leading-none tracking-wide">Abhinav Sabu</p>
            <p className="font-mono text-xs text-secondary opacity-70 mt-0.5" ref={timeRef}>--:--:--</p>
          </div>
        </div>

        {/* Center — Pill Nav (Desktop) */}
        <div
          ref={pillRef}
          className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'bg-primary/90 border-secondary/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(201,106,74,0.15)]'
              : 'bg-primary/60 border-white/10 backdrop-blur-md'
          }`}
        >
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`relative px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-secondary text-primary'
                    : 'text-[#e8e4df]/70 hover:text-[#e8e4df]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Right — CTA + Menu */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/50 text-secondary font-body text-sm font-medium hover:bg-secondary hover:text-primary transition-all duration-300 group"
          >
            <span>Resume</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Hamburger - Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-secondary/30 flex flex-col items-center justify-center gap-1.5 hover:border-secondary/70 transition-all"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-px bg-[#e8e4df] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-4 h-px bg-[#e8e4df] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-px bg-[#e8e4df] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-24 left-4 right-4 z-40 md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
      >
        <div className="bg-primary/95 backdrop-blur-xl border border-secondary/20 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-[#e8e4df]/80 hover:text-[#e8e4df] hover:bg-secondary/10 font-body text-base font-medium transition-all text-left"
              >
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <a
              href="/resume.pdf"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-secondary text-primary font-body font-semibold text-sm"
            >
              Download Resume ↗
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
