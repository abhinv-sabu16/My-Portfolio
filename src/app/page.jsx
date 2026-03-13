'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import MarqueeBanner from '@/components/ui/MarqueeBanner'

// Dynamic imports for client-only components
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Only show loader on first visit
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setShowLoader(false)
      setLoaded(true)
    } else {
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleLoaderComplete = () => {
    setLoaded(true)
    setShowLoader(false)
  }

  return (
    <SmoothScroll>
      <CustomCursor />

      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />

        <main>
          <Hero />

          <MarqueeBanner dark={true} />

          <About />

          <Skills />

          <Projects />

          <Blog />

          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
