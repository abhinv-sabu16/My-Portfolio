'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackPosts = [
  {
    id: '1',
    title: 'Building Scalable APIs with Node.js and MongoDB',
    excerpt: 'A deep dive into designing RESTful APIs that can handle millions of requests with proper indexing strategies.',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    tag: 'Backend',
    slug: '#',
  },
  {
    id: '2',
    title: 'GSAP Animations in Next.js — The Right Way',
    excerpt: 'How to properly implement GSAP with React and Next.js without fighting the virtual DOM.',
    date: 'Nov 28, 2024',
    readTime: '6 min',
    tag: 'Frontend',
    slug: '#',
  },
  {
    id: '3',
    title: 'Using Notion as a Headless CMS',
    excerpt: 'Leveraging the Notion API to power your portfolio, blog, or product catalog with zero infrastructure.',
    date: 'Nov 10, 2024',
    readTime: '5 min',
    tag: 'Tutorial',
    slug: '#',
  },
]

export default function Blog({ notionPosts }) {
  const posts = notionPosts?.length ? notionPosts : fallbackPosts
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          delay: i * 0.12,
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
    <section ref={sectionRef} id="blog" className="section-light py-28 md:py-36 relative overflow-hidden">
      {/* Decorative accent */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(28,31,36,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header — section-light so colors are reversed */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="font-mono text-sm text-primary/50 tracking-widest uppercase">Writing</span>
            </div>
            <h2
              className="font-display font-black text-primary"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              Thoughts &<br />
              <em>Tutorials</em>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {notionPosts ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <span className="font-mono text-xs text-primary/50">From Notion</span>
              </div>
            ) : null}
            <a href="#" className="font-mono text-sm text-primary/50 hover:text-primary transition-colors flex items-center gap-1">
              All Posts →
            </a>
          </div>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <article
              key={post.id}
              ref={el => cardsRef.current[i] = el}
              className="group p-7 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/8 hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              {/* Tag */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 font-mono text-xs text-primary/60 mb-5">
                {post.tag}
              </span>

              {/* Title */}
              <h3 className="font-display font-bold text-primary text-xl leading-tight mb-3 group-hover:text-primary/80 transition-colors">
                {post.title}
              </h3>

              <p className="font-body text-primary/50 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary/30">{post.date}</span>
                  <span className="text-primary/20">·</span>
                  <span className="font-mono text-xs text-primary/30">{post.readTime} read</span>
                </div>
                <a
                  href={post.slug}
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary/50 group-hover:bg-primary group-hover:text-secondary transition-all duration-300"
                >
                  →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
