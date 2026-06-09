export type ProjectMeta = {
  slug: string
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  cover?: string
  images?: string[]
  date: string
  featured: boolean
  status: 'completed' | 'in-progress'
}

export type Project = ProjectMeta & { content: string }

export const techIconMap: Record<string, string> = {
  'React': '/react.png',
  'Next.js': '/react.png',
  'NestJS': '/nest.png',
  'Flutter': '/flutter.png',
  'Android': '/android.png',
  'Kotlin': '/kt.png',
  'TypeScript': '/ts.png',
  'Spring Boot': '/spring.png',
  'Spring': '/spring.png',
}
