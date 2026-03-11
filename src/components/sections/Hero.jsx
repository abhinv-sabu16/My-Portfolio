'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const roles = ['Full Stack Developer', 'Next.js Architect', 'Node.js Engineer', 'UI/UX Craftsman']

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const orbRef = useRef(null)
  const roleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.6 })

    // Grid fade
    tl.fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0
    )

    // Orb
    tl.fromTo(orbRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0.2
    )

    // Headline words stagger
    const words = headlineRef.current?.querySelectorAll('.word')
    if (words) {
      tl.fromTo(words,
        { y: 80, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.4
      )
    }

    // Sub text
    tl.fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9
    )

    // CTA
    tl.fromTo(ctaRef.current?.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 1.1
    )

    // Floating orb continuous animation
    gsap.to(orbRef.current, {
      y: -30,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3,
    })

    // Role cycling
    let roleIndex = 0
    const cycleRoles = () => {
      roleIndex = (roleIndex + 1) % roles.length
      gsap.to(roleRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          if (roleRef.current) roleRef.current.textContent = roles[roleIndex]
          gsap.fromTo(roleRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          )
        }
      })
    }
    const roleInterval = setInterval(cycleRoles, 3000)

    // Parallax on scroll
    gsap.to(orbRef.current, {
      y: 200,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    })

    return () => clearInterval(roleInterval)
  }, [])

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-dark relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 106, 74, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 106, 74, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary/80 pointer-events-none" />

      {/* Decorative orb */}
      <div
        ref={orbRef}
        className="absolute right-[-5%] top-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(201,106,74,0.25) 0%, rgba(201,106,74,0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Rotating ring */}
      <div className="absolute right-[8%] top-[20%] w-64 h-64 opacity-10">
        <div className="rotating-badge w-full h-full border border-secondary rounded-full" />
        <div className="absolute inset-8 border border-secondary/50 rounded-full" style={{ animationDirection: 'reverse', animation: 'rotateBadge 10s linear infinite reverse' }} />
      </div>

      {/* Corner accent */}
      <div className="absolute top-28 right-8 md:right-16 flex flex-col items-end gap-1">
        <p className="font-mono text-xs text-secondary/60 tracking-widest">STATUS</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-white/40">AVAILABLE</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Role badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-secondary" />
            <span
              ref={roleRef}
              className="font-mono text-secondary text-sm tracking-wide"
            >
              {roles[0]}
            </span>
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="font-display font-black leading-[0.9] mb-8 overflow-hidden">
            {['Crafting', 'Digital', 'Experiences', 'That Matter'].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  className={`word inline-block ${i % 2 !== 0 ? 'ml-[clamp(20px,5vw,80px)] text-secondary' : ''}`}
                  style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p ref={subRef} className="font-body text-white/50 text-lg max-w-lg leading-relaxed mb-12 opacity-0">
            I architect and build full-stack applications — from elegant frontends to robust backends — with obsessive attention to performance and craft.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToWork}
              className="group relative px-8 py-4 bg-secondary text-primary font-body font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,106,74,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-white/15 text-white/70 font-body font-medium rounded-full hover:border-secondary/50 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-24 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '5+', label: 'Years Experience' },
            { num: '40+', label: 'Projects Shipped' },
            { num: '15+', label: 'Happy Clients' },
            { num: '∞', label: 'Lines of Code' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center md:text-left">
              <div className="stat-number">{num}</div>
              <p className="font-body text-white/30 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-white/20 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-secondary/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
