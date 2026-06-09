import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import ProjectCard from '@/app/components/ProjectCard'

export default function ProjectsSection() {
  const projects = getFeaturedProjects()

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2
            className="text-[3rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] leading-none text-white reveal dissolve"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            Projects<span className="text-orange-500">.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-2 reveal dissolve">
            Things I've built — backends, mobile apps, and web projects.
          </p>
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-400 transition-colors duration-200 shrink-0 mb-2 nav-item-smooth"
        >
          View all projects
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-zinc-600 text-sm">No projects yet — coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-cards-group">
          {projects.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
