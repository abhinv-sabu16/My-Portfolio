'use client'

const items = [
  'Next.js', '✦', 'Node.js', '✦', 'MongoDB', '✦', 'TypeScript', '✦',
  'React', '✦', 'GSAP', '✦', 'Tailwind CSS', '✦', 'PostgreSQL', '✦',
  'Docker', '✦', 'AWS', '✦', 'REST APIs', '✦', 'GraphQL', '✦',
]

export default function MarqueeBanner({ dark = true }) {
  return (
    <div className={`py-5 overflow-hidden border-y ${dark ? 'border-white/5 bg-white/2' : 'border-primary/10 bg-primary/5'}`}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`inline-block font-mono text-sm uppercase tracking-widest mx-4 ${
              item === '✦'
                ? 'text-secondary'
                : dark ? 'text-white/20' : 'text-primary/30'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
