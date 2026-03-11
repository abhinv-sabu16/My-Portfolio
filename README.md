# 🚀 Developer Portfolio — Next.js + Node.js + GSAP + Notion

A unique, high-performance portfolio website built with Next.js 14, featuring GSAP animations, Notion CMS integration, and a distinctive dark/terracotta aesthetic.

## ✨ Features

- **Unique Floating Pill Navbar** — Orbital design with live time display and active section detection
- **GSAP Animations** — Loader counter, hero word-by-word reveal, scroll-triggered entrances, parallax effects
- **Lenis Smooth Scrolling** — Buttery-smooth page scrolling
- **Notion Integration** — Manage projects & blog posts from your Notion workspace
- **MongoDB Contact Storage** — Contact form submissions saved to MongoDB
- **Custom Cursor** — Magnetic cursor with hover effects
- **70/30 Color Ratio** — `#1C1F24` primary (70%) / `#C96A4A` secondary (30%), reversed per section
- **Responsive** — Mobile-first, fully responsive
- **Noise texture** — Subtle film grain overlay
- **Rotating badge** — SVG text path orbital badge in About section

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#1C1F24` | Dark backgrounds, text on secondary sections |
| `--secondary` | `#C96A4A` | Accents, CTA buttons, text on dark sections |
| `--font-display` | Playfair Display | Headlines, numbers |
| `--font-body` | DM Sans | Body text, UI |
| `--font-mono` | JetBrains Mono | Labels, code, tags |

**Color inversion rule:** On `section-dark` (primary bg), use secondary color for accents. On `section-light` (secondary bg), use primary color for text and accents.

## 🗂️ Project Structure

```
portfolio/
├── app/
│   ├── layout.jsx          # Root layout with fonts
│   ├── page.jsx            # Main page (client)
│   ├── globals.css         # ← Moved to styles/
│   └── api/
│       ├── contact/route.js  # POST contact form
│       └── projects/route.js # GET Notion projects
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       # Floating pill navbar
│   │   └── Footer.jsx       # Inverted color footer
│   ├── sections/
│   │   ├── Hero.jsx         # Animated hero with word reveal
│   │   ├── About.jsx        # About + rotating badge
│   │   ├── Skills.jsx       # Skill bars + category cards
│   │   ├── Projects.jsx     # Notion-powered project grid
│   │   ├── Blog.jsx         # Notion-powered blog posts
│   │   └── Contact.jsx      # Contact form → MongoDB
│   └── ui/
│       ├── CustomCursor.jsx # Magnetic custom cursor
│       ├── Loader.jsx       # Loading screen with counter
│       ├── MarqueeBanner.jsx # Scrolling tech stack ticker
│       └── SmoothScroll.jsx # Lenis wrapper
├── lib/
│   └── notion.js            # Notion API helpers
├── styles/
│   └── globals.css          # Global styles, animations
└── .env.local.example       # Environment variable template
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in the values in `.env.local`.

### 3. Set Up Notion (Optional but Recommended)

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) and create an integration
2. Copy the **Internal Integration Token** → `NOTION_API_KEY`
3. Create a **Projects** database with these properties:
   - `Title` (Title)
   - `Description` (Text)
   - `Tech` (Multi-select)
   - `Category` (Select)
   - `LiveUrl` (URL)
   - `GithubUrl` (URL)
   - `Featured` (Checkbox)
   - `Status` (Select) — use "Published" to show
   - `Accent` (Text) — hex color like `#C96A4A`
   - `Order` (Number)
4. Share the database with your integration
5. Copy the database ID from the URL → `NOTION_PROJECTS_DB_ID`
6. Repeat for a **Blog** database with: `Title`, `Excerpt`, `Date`, `ReadTime`, `Tag`, `Published`

### 4. Set Up MongoDB (Optional)

```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# Or MongoDB Atlas (recommended)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📸 Customization

### Update Personal Info

1. **Hero section** — Edit `components/sections/Hero.jsx`:
   - Update `roles` array
   - Change stats (years, projects, clients)

2. **About section** — Edit `components/sections/About.jsx`:
   - Replace the avatar placeholder with your photo: `<Image src="/me.jpg" .../>`
   - Update the bio text

3. **Contact section** — Edit `components/sections/Contact.jsx`:
   - Update email, LinkedIn, GitHub links

4. **Footer** — Edit `components/layout/Footer.jsx`:
   - Update social links

5. **Projects/Blog** — Either use Notion (recommended) or edit the `fallbackProjects` / `fallbackPosts` arrays

### Replacing the Avatar

Place your photo at `public/me.jpg` and update the About section image:

```jsx
import Image from 'next/image'
// Replace the placeholder div with:
<Image src="/me.jpg" alt="Your Name" fill className="object-cover" />
```

## 🎬 GSAP Animations

| Animation | Location | Description |
|-----------|----------|-------------|
| Loader counter | `Loader.jsx` | 0-100% with bar fill |
| Navbar entrance | `Navbar.jsx` | Elastic bounce from top |
| Hero word reveal | `Hero.jsx` | Staggered word-by-word |
| Role cycling | `Hero.jsx` | Auto-rotating role text |
| Orb parallax | `Hero.jsx` | Scroll-driven parallax |
| About entrance | `About.jsx` | Slide + fade on scroll |
| Rotating badge | `About.jsx` | Infinite CSS/GSAP rotation |
| Skill bars | `Skills.jsx` | Width tween on scroll |
| Project cards | `Projects.jsx` | Stagger on scroll |
| Footer text | `Footer.jsx` | Opacity scrub on scroll |

## 📦 Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Animations** — GSAP 3.12 + ScrollTrigger
- **Smooth Scroll** — Lenis
- **CMS** — Notion API
- **Database** — MongoDB (optional)
- **Styling** — Tailwind CSS
- **Fonts** — Playfair Display + DM Sans + JetBrains Mono
- **Icons** — Lucide React

## 🌐 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
vercel --prod
```

Set all environment variables in your Vercel project settings.

---

Built with ❤️ using Next.js + GSAP + Notion
