# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website for Chan Kim built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It's configured for static export and deployment on Cloudflare Pages.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Deployment**: Static export for Cloudflare Pages

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# Run linting
npm run lint
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Layout components (Header)
│   └── ui/             # Reusable UI components (ProjectCard)
├── data/               # Static data (projects, content)
├── types/              # TypeScript type definitions
└── lib/                # Utility functions (if needed)

public/
├── images/             # Project images and assets
└── ...                 # Other static files
```

## Key Features

### Static Export Configuration
- Configured in `next.config.ts` for Cloudflare Pages
- Uses `output: 'export'` for static generation
- Images are unoptimized for static hosting

### Design System
- Gradient text effects using `bg-gradient-to-r` and `bg-clip-text`
- Consistent color palette: blue-600, purple-600, gray variants
- Responsive design with mobile-first approach
- Glass morphism effects with backdrop blur

### Animation Patterns
- Page transitions using Framer Motion
- Staggered animations for project cards
- Hover effects with scale and shadow transforms
- Scroll-triggered animations with `whileInView`

## Development Guidelines

### Adding New Projects
1. Update `src/data/projects.ts` with new project data
2. Add project images to `public/images/`
3. Follow the existing Project interface in `src/types/index.ts`

### Component Creation
- Use TypeScript interfaces for props
- Follow the existing naming conventions
- Include Framer Motion animations for consistency
- Use Tailwind utility classes for styling

### Styling Conventions
- Use gradient backgrounds for hero sections
- Apply consistent shadow patterns: `shadow-lg`, `hover:shadow-xl`
- Follow the established color scheme
- Use `motion.div` for all animated elements

### Content Management
- Project data is stored in `src/data/projects.ts`
- Type definitions are in `src/types/index.ts`
- Static assets go in `public/images/`

## Deployment

The site is configured for static export and designed to work with Cloudflare Pages:

1. Build the site: `npm run build`
2. The static files will be in the `dist/` directory
3. Deploy the `dist/` folder to Cloudflare Pages

## Performance Considerations

- All images should be optimized before adding to `public/images/`
- Large assets should be compressed
- Consider lazy loading for non-critical images
- Framer Motion animations are optimized for 60fps

## Responsive Design

- Mobile-first approach using Tailwind breakpoints
- Grid layouts that adapt: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flexible typography scaling: `text-xl md:text-2xl`
- Touch-friendly button sizes on mobile