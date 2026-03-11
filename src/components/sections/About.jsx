'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      }
    })

    tl.fromTo(imageRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(contentRef.current?.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, '-=0.6'
    )

    // Rotating badge
    gsap.to(badgeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section-light relative overflow-hidden py-28 md:py-36">
      {/* Decorative dots */}
      <div className="absolute top-16 right-16 grid grid-cols-5 gap-2 opacity-20">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-primary" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div ref={imageRef} className="relative">
            {/* Main image placeholder */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Photo frame */}
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Avatar placeholder with initials */}
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    style={{ background: 'linear-gradient(135deg, rgba(28,31,36,0.8) 0%, rgba(28,31,36,0.4) 100%)' }}
                  >
                    <div className="w-28 h-28 rounded-full border-4 border-primary/30 flex items-center justify-center bg-primary/50">
                      <span className="font-display font-black text-secondary text-5xl"></span>
                    </div>
                    <p className="font-body text-primary/60 text-sm"></p>
                  </div>
                </div>
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/20 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-[#e8e4df] p-5 rounded-2xl shadow-2xl z-20">
                <p className="font-mono text-xs text-secondary mb-1">Currently</p>
                <p className="font-display font-bold text-base">Open to Work</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-white/40">Remote / On-site</span>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-primary/20 -z-0" />
            </div>

            {/* Rotating circular badge */}
            <div ref={badgeRef} className="absolute top-4 -right-4 w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path id="circle-path" d="M 50,50 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                </defs>
                <text className="fill-primary text-[9px]" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
                  <textPath href="#circle-path" startOffset="0%">
                    FULL STACK DEVELOPER • NEXT.JS • NODE.JS •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Content side — REVERSED: secondary bg = primary text */}
          <div ref={contentRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/40" />
              <span className="font-mono text-sm text-primary/60 tracking-widest uppercase">About Me</span>
            </div>

            <h2 className="font-display font-black text-primary mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}>
              I Build Things <em>People Love</em> to Use
            </h2>

            <p className="font-body text-primary/70 text-base leading-relaxed mb-5">
              With over 5 years of experience, I specialize in building high-performance web applications using Next.js and Node.js. I love the intersection of engineering and design — where every pixel and every API endpoint matters.
            </p>

            <p className="font-body text-primary/70 text-base leading-relaxed mb-8">
              From architecting scalable MongoDB schemas to crafting silky-smooth GSAP animations, I obsess over the details that elevate good products to great ones.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: '⚡', title: 'Performance', desc: 'Every millisecond counts' },
                { icon: '🎨', title: 'Craft', desc: 'Pixel-perfect execution' },
                { icon: '🔐', title: 'Security', desc: 'Built to be trusted' },
                { icon: '📐', title: 'Architecture', desc: 'Scalable by design' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-primary/8 border border-primary/10 hover:bg-primary/12 transition-colors">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="font-body font-semibold text-primary text-sm">{title}</p>
                    <p className="font-body text-primary/50 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-secondary font-body font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 group"
            >
              Let&apos;s Talk
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
