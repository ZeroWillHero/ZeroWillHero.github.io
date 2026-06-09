import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogContent from '@/app/components/BlogContent'
import { getProjectBySlug, getAllProjects, techIconMap } from '@/lib/projects'

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: `${project.title} — Chameera Sandakelum`, description: project.description }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const allIcons = project.tech.filter(t => techIconMap[t])

  return (
    <main className="p-2 min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white animate-page-fade-in">

      {/* Hero area */}
      <div className="relative w-full overflow-hidden">
        {project.cover ? (
          <div className="relative h-44 sm:h-56 md:h-72">
            <Image src={project.cover} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/80" />
          </div>
        ) : (
          <div className="relative h-40 sm:h-48 md:h-60 bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 project-card-grid opacity-20" />
            <span
              className="absolute right-16 top-1/2 -translate-y-1/2 leading-none text-white/[0.04] pointer-events-none select-none"
              style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 'clamp(6rem, 18vw, 16rem)' }}
            >
              {project.title.charAt(0)}
            </span>
            {/* Tech icons in hero */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {allIcons.map(t => (
                <div key={t} title={t} className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center p-2">
                  <Image src={techIconMap[t]} alt={t} width={24} height={24} className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <section className="relative mx-auto w-full max-w-3xl px-4 pt-6 pb-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-orange-400 transition-colors duration-200 mb-8 nav-item-smooth"
        >
          ← Back to projects
        </Link>

        {/* Status + date */}
        <div className="flex items-center gap-4 mb-4">
          {project.status === 'in-progress' ? (
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-amber-400">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
              </span>
              In Progress
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Completed
            </span>
          )}
          <span className="text-xs text-zinc-600">{project.date}</span>
        </div>

        {/* Title */}
        <h1
          className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] leading-none text-white mb-4"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          {project.title}
        </h1>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-orange-400 border border-orange-500/30 rounded-full px-3 py-1">
              {techIconMap[t] && (
                <Image src={techIconMap[t]} alt={t} width={12} height={12} className="object-contain" />
              )}
              {t}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-zinc-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-700 hover:border-orange-500/50 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 bg-zinc-900/40"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              View on GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
        </div>

        {/* Screenshot gallery */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {project.images.map((src, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800">
                <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Markdown content */}
        <BlogContent content={project.content} />
      </section>
    </main>
  )
}
