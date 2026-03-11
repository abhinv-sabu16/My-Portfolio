'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const leftRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gsap.fromTo(leftRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
      }
    )
    gsap.fromTo(formRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
      }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        gsap.fromTo('.success-msg', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="section-dark py-28 md:py-36 relative overflow-hidden">
      {/* Bg orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,106,74,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <div ref={leftRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-secondary" />
              <span className="font-mono text-secondary text-sm tracking-widest uppercase">Contact</span>
            </div>

            <h2
              className="font-display font-black text-[#e8e4df] mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Let&apos;s Build<br />
              Something<br />
              <em className="text-secondary">Great Together</em>
            </h2>

            <p className="font-body text-white/50 text-base leading-relaxed mb-10 max-w-sm">
              Have a project in mind? Looking for a developer to join your team? Or just want to say hello? I&apos;d love to hear from you.
            </p>

            <div className="space-y-5">
              {[
                { icon: '✉', label: 'Email', value: 'abhinavsabu22@gmail.com', href: 'mailto:abhinavsabu22@gmail.com' },
                { icon: '💼', label: 'LinkedIn', value: '/in/devportfolio', href: '#' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/devportfolio', href: '#' },
                { icon: '📍', label: 'Location', value: 'Kochi, Kerala', href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-base flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/30">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-sm text-white/60 hover:text-secondary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-white/60">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-white/6 bg-white/2 space-y-5"
            >
              <h3 className="font-display font-bold text-[#e8e4df] text-xl mb-6">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 font-body text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-secondary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-white/30 block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 font-body text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-secondary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-white/30 block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 font-body text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-secondary text-primary font-body font-semibold text-sm hover:bg-secondary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="success-msg font-body text-sm text-green-400 text-center">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="font-body text-sm text-red-400 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
