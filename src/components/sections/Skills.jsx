'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const skillCategories = [
  {
    title: 'Frontend',
    icon: '◈',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'Redux'],
  },
  {
    title: 'Backend',
    icon: '⬡',
    skills: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth', 'Microservices'],
  },
  {
    title: 'Database',
    icon: '⬢',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Mongoose', 'Supabase', 'Firebase', 'SQL'],
  },
  {
    title: 'DevOps & Tools',
    icon: '◎',
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitHub Actions', 'Linux', 'Nginx', 'Notion API'],
  },
]

const topSkills = [
  { name: 'Next.js', level: 95 },
  { name: 'Node.js', level: 92 },
  { name: 'MongoDB', level: 88 },
  { name: 'TypeScript', level: 90 },
  { name: 'React', level: 96 },
  { name: 'GSAP', level: 82 },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const barsRef = useRef([])
  const cardsRef = useRef([])

  useEffect(() => {
    // Animate skill bars
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      const level = topSkills[i]?.level || 0
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            once: true,
          }
        }
      )
    })

    // Animate cards
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section-dark py-28 md:py-36 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-1 opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-secondary" />
              <span className="font-mono text-secondary text-sm tracking-widest uppercase">Expertise</span>
            </div>
            <h2
              className="font-display font-black text-[#e8e4df]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              My Tech Stack &<br />
              <em className="text-secondary">Core Skills</em>
            </h2>
          </div>
          <p className="font-body text-white/40 text-sm max-w-xs leading-relaxed">
            Constantly learning, always evolving. Here&apos;s what I bring to the table.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Skill bars */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#e8e4df] mb-8">Proficiency Levels</h3>
            <div className="space-y-6">
              {topSkills.map(({ name, level }, i) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-white/70 font-medium">{name}</span>
                    <span className="font-mono text-xs text-secondary">{level}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      ref={el => barsRef.current[i] = el}
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--secondary), rgba(201,106,74,0.5))',
                        width: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun stats */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[#e8e4df] mb-8">By The Numbers</h3>
            {[
              { icon: '☕', label: 'Cups of Coffee', value: '2,847', sub: 'and counting' },
              { icon: '🚀', label: 'Projects Deployed', value: '40+', sub: 'in production' },
              { icon: '⭐', label: 'GitHub Stars', value: '500+', sub: 'earned' },
              { icon: '📦', label: 'npm Packages', value: '12', sub: 'published' },
            ].map(({ icon, label, value, sub }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-secondary/30 transition-all duration-500 group">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <p className="font-body text-white/50 text-xs">{label}</p>
                  <p className="font-display font-bold text-[#e8e4df] text-lg leading-tight">{value}</p>
                </div>
                <span className="font-mono text-xs text-white/20 group-hover:text-secondary/50 transition-colors">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map(({ title, icon, skills }, i) => (
            <div
              key={title}
              ref={el => cardsRef.current[i] = el}
              className="p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-secondary/30 hover:bg-white/4 transition-all duration-500 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-secondary text-xl font-mono">{icon}</span>
                <h3 className="font-display font-bold text-[#e8e4df] text-base">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="skill-pill px-2.5 py-1 rounded-full font-mono text-xs text-white/50 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
