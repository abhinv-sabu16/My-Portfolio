'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Fallback project data when Notion is not configured
const fallbackProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack Next.js e-commerce with Stripe payments, inventory management, and real-time analytics dashboard.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    category: 'Full Stack',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    accent: '#C96A4A',
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'SaaS platform leveraging Grok APIs to generate marketing copy, blog posts, and social media content.',
    tech: ['React.js', 'Grok', 'MongoDB', 'RAG', 'Tailwind', 'Node.js', 'Express.js'],
    category: 'AI / SaaS',
    liveUrl: 'https://content-ai-abhinav-sabus-projects.vercel.app/',
    githubUrl: 'https://github.com/abhinv-sabu16/Content-Ai',
    featured: true,
    accent: '#4A8FC9',
  },
  {
    id: '3',
    title: 'Real-Time Chat App',
    description: 'WebSocket-based chat application with rooms, file sharing, and end-to-end encryption.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    category: 'Backend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    accent: '#6AC96A',
  },
  {
    id: '4',
    title: 'Portfolio CMS',
    description: 'Headless CMS built with Notion as the backend, featuring dynamic page generation and ISR.',
    tech: ['Next.js', 'Notion API', 'TypeScript', 'GSAP'],
    category: 'Full Stack',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    accent: '#C9A84A',
  },
  {
    id: '5',
    title: 'Dev Analytics Dashboard',
    description: 'Real-time dashboard tracking GitHub stats, npm downloads, and deployment metrics in one place.',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    category: 'Data / Frontend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    accent: '#C96A4A',
  },
  {
    id: '6',
    title: 'Microservices API Gateway',
    description: 'Production-ready API gateway with rate limiting, auth, and service discovery built on Node.js.',
    tech: ['Node.js', 'Docker', 'Redis', 'JWT', 'Nginx'],
    category: 'Backend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    accent: '#8A4AC9',
  },
]

const filterOptions = ['All', 'Full Stack', 'Backend', 'AI / SaaS', 'Data / Frontend']

export default function Projects({ notionProjects }) {
  const projects = notionProjects?.length ? notionProjects : fallbackProjects
  const [filter, setFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  useEffect(() => {
    gsap.fromTo(
      gridRef.current?.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    )
  }, [])

  // Re-animate on filter change
  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out' }
    )
  }, [filter])

  return (
    <section ref={sectionRef} id="projects" className="section-dark py-28 md:py-36 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute right-0 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-secondary" />
              <span className="font-mono text-secondary text-sm tracking-widest uppercase">Portfolio</span>
            </div>
            <h2
              className="font-display font-black text-[#e8e4df]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              Selected <em className="text-secondary">Projects</em>
            </h2>
          </div>
          {notionProjects ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/30 bg-secondary/5">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-mono text-xs text-secondary/70">Powered by Notion</span>
            </div>
          ) : null}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-500 ${
                filter === opt
                  ? 'bg-secondary text-primary font-semibold'
                  : 'border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              className="project-card group relative p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-secondary/30 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.accent}10 0%, transparent 70%)`,
                }}
              />

              {/* Category badge */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-secondary/60 uppercase tracking-wider">{project.category}</span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 font-mono text-xs text-secondary">Featured</span>
                )}
              </div>

              {/* Project number */}
              <div
                className="font-display font-black text-7xl leading-none mb-4 opacity-10 group-hover:opacity-20 transition-opacity select-none"
                style={{ color: project.accent }}
              >
                {String(filtered.indexOf(project) + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-[#e8e4df] text-xl mb-3 group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <p className="font-body text-white/40 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map(t => (
                  <span key={t} className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/4 text-white/40 border border-white/6">
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-1.5 font-body text-xs text-secondary hover:text-secondary/80 transition-colors font-medium"
                >
                  Live Demo
                  <span>↗</span>
                </a>
                <span className="text-white/10">|</span>
                <a
                  href={project.githubUrl}
                  className="flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  GitHub
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/abhinv-sabu16"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full font-body text-sm text-white/40 hover:border-secondary/40 hover:text-white/70 transition-all duration-500"
          >
            View All Projects on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
