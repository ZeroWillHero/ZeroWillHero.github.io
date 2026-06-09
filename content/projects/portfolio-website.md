---
title: "Portfolio Website"
description: "Personal portfolio built with Next.js 16, Tailwind CSS v4, and GSAP scroll animations — featuring a blog system and contact form."
tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "React"]
github: "https://github.com/ZeroWillHero/portfolio"
live: ""
cover: ""
images: []
date: "2026-06-01"
featured: true
status: "completed"
---

# Portfolio Website

This is the portfolio you're currently viewing. Designed and built from scratch to showcase projects, blog posts, and provide a way to get in touch.

## Features

- **Animated hero** — large floating typography with GSAP scroll-triggered dissolve reveals
- **Blog system** — drop a `.md` file in `content/blogs/` and it auto-publishes with frontmatter metadata
- **Projects section** — same file-based approach for project showcases
- **Contact form** — mailto-based form that opens your email client pre-filled
- **Dark theme** — consistent dark gradient with orange accents throughout

## Technical Highlights

The animation system uses GSAP ScrollTrigger for batched, performant scroll reveals. Each `.reveal` element gets staggered entrance timing without any JavaScript state — pure CSS transitions triggered by a single GSAP observer.

Fonts are loaded via `next/font/google` at the layout level as CSS variables, making them available globally without any client bundle cost.

## Stack

Built on Next.js 16 App Router with full TypeScript. Tailwind CSS v4 handles all styling. No UI component library — everything is custom.
