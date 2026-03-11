'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = {
  Navigation: ['Work', 'About', 'Skills', 'Blog', 'Contact'],
  Connect: ['GitHub', 'LinkedIn', 'Twitter', 'Dribbble', 'Email'],
}

const techStack = ['Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'React', 'Tailwind']

export default function Footer() {
  const footerRef = useRef(null)
  const bigTextRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(bigTextRef.current,
      { opacity: 0.05 },
      {
        opacity: 0.06,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        }
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-secondary text-primary overflow-hidden">
      {/* Giant background text */}
      <div
        ref={bigTextRef}
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none"
        style={{
          fontSize: 'clamp(80px, 18vw, 200px)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          lineHeight: 0.85,
          color: 'rgba(28, 31, 36, 0.08)',
          letterSpacing: '-0.05em',
        }}
      >
        LET&apos;S BUILD
      </div>

      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display font-black text-secondary text-lg">Ø</span>
              </div>
              <div>
                <p className="font-display font-bold text-lg text-primary leading-none">Dev.Portfolio</p>
                <p className="font-mono text-xs text-primary/60 mt-0.5">Full Stack Developer</p>
              </div>
            </div>
            <p className="font-body text-primary/70 text-sm leading-relaxed max-w-xs mb-8">
              Crafting performant, beautiful web experiences with modern technologies. Available for freelance projects and full-time roles.
            </p>
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-primary font-medium">Available for hire</span>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="font-body text-sm text-primary/70 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get in touch */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-primary/40 uppercase tracking-widest mb-5">Get In Touch</h4>
            <a
              href="mailto:hello@devportfolio.com"
              className="font-display text-xl font-bold text-primary hover:text-primary/70 transition-colors block mb-4"
            >
              hello@devportfolio.com
            </a>
            <p className="font-body text-sm text-primary/60 mb-6">Based in <span className="font-medium text-primary">San Francisco, CA</span></p>
            {/* Social icons */}
            <div className="flex gap-2">
              {['GH', 'LI', 'TW', 'DR'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center font-mono text-xs text-primary/60 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary/15 mb-8" />

        {/* Tech stack marquee — flipped colors */}
        <div className="overflow-hidden mb-8">
          <div className="marquee-track gap-6">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="inline-flex items-center gap-3 font-mono text-xs text-primary/40 uppercase tracking-widest">
                {tech}
                <span className="text-primary/20">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-primary/40">
            © {new Date().getFullYear()} Dev.Portfolio — Designed & Built with precision
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-primary/40 hover:text-primary/70 transition-colors">Privacy</a>
            <a href="#" className="font-mono text-xs text-primary/40 hover:text-primary/70 transition-colors">Terms</a>
            <span className="font-mono text-xs text-primary/40">
              Next.js + GSAP ✦ v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
