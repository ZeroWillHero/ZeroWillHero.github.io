import type { Metadata } from 'next'
import { NavBar } from '@/app/components/NavBar'
import ProjectCard from '@/app/components/ProjectCard'
import GsapReveal from '@/app/components/GsapReveal'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects — Chameera Sandakelum',
  description: 'Backend, mobile, and web projects by Chameera Sandakelum.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="p-2 min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white animate-page-fade-in">
      <section className="relative mx-auto w-full max-w-5xl px-4 pt-16 sm:pt-20 md:pt-28 pb-16">
        <NavBar />

        <h1
          className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none text-white mb-2 reveal dissolve"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          Projects<span className="text-orange-500">.</span>
        </h1>
        <p className="text-zinc-400 text-sm mb-12 reveal dissolve">
          A collection of things I've designed and built.
        </p>

        {projects.length === 0 ? (
          <p className="text-zinc-500 text-sm">No projects yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-cards-group">
            {projects.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </section>
      <GsapReveal />
    </main>
  )
}
