import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ProjectMeta, Project } from './project-types'

export type { ProjectMeta, Project } from './project-types'
export { techIconMap } from './project-types'

const projectsDir = path.join(process.cwd(), 'content/projects')

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return []
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => parseMeta(filename))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { ...metaFromData(slug, data), content }
}

function parseMeta(filename: string): ProjectMeta {
  const slug = filename.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8')
  const { data } = matter(raw)
  return metaFromData(slug, data)
}

function metaFromData(slug: string, data: Record<string, unknown>): ProjectMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? '',
    tech: (data.tech as string[]) ?? [],
    github: data.github as string | undefined,
    live: data.live as string | undefined,
    cover: data.cover as string | undefined,
    images: (data.images as string[]) ?? [],
    date: (data.date as string) ?? '',
    featured: (data.featured as boolean) ?? false,
    status: (data.status as 'completed' | 'in-progress') ?? 'completed',
  }
}
