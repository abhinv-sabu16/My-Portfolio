'use client'

const items = [
  'Next.js', '✦', 'Node.js', '✦', 'MongoDB', '✦', 'TypeScript', '✦',
  'React', '✦', 'GSAP', '✦', 'Tailwind CSS', '✦', 'PostgreSQL', '✦',
  'Docker', '✦', 'AWS', '✦', 'REST APIs', '✦', 'GraphQL', '✦',
]

export default function MarqueeBanner({ dark = true }) {
  return (
    <div className={`py-5 overflow-hidden border-y group ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-primary/10 bg-primary/[0.05]'}`}>
      <div 
        className="group-hover:![animation-play-state:paused]"
        style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 40s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', margin: '0 16px' }}
            className={`font-mono text-sm uppercase tracking-widest ${
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