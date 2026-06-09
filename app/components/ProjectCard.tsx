'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { techIconMap, type ProjectMeta } from '@/lib/project-types'

function StatusBadge({ status }: { status: 'completed' | 'in-progress' }) {
  return status === 'in-progress' ? (
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
  )
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  const router = useRouter()
  const icons = project.tech.filter(t => techIconMap[t]).slice(0, 5)

  return (
    <div
      onClick={() => router.push(`/projects/${project.slug}`)}
      className="reveal-card group flex flex-col border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-900/70 hover:-translate-y-1"
    >
      {/* Cover image or styled placeholder */}
      <div className="relative h-48 overflow-hidden bg-zinc-950 shrink-0">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 project-card-grid opacity-30" />
            <span
              className="absolute right-6 bottom-2 text-[7rem] leading-none text-white/5 pointer-events-none select-none"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              {project.title.charAt(0)}
            </span>
            <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
              {icons.map(t => (
                <div key={t} title={t} className="w-7 h-7 rounded-md bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center p-1.5">
                  <Image src={techIconMap[t]} alt={t} width={20} height={20} className="object-contain" />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <StatusBadge status={project.status} />
          <span className="text-zinc-600 text-xs">{project.date.slice(0, 7)}</span>
        </div>

        <h3
          className="text-2xl leading-tight text-white group-hover:text-orange-400 transition-colors duration-200"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          {project.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="text-[10px] uppercase tracking-widest text-orange-400/80 border border-orange-500/20 rounded-full px-2 py-0.5">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] text-zinc-600 border border-zinc-800 rounded-full px-2 py-0.5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* External links — stopPropagation so they don't trigger the card click */}
        <div
          className="flex items-center gap-4 pt-1 border-t border-zinc-800/80"
          onClick={e => e.stopPropagation()}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-orange-400 transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
          <span className="ml-auto text-zinc-700 text-xs group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200">
            Details →
          </span>
        </div>
      </div>
    </div>
  )
}
