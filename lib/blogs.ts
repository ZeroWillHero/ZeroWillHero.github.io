import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime?: string
}

export type BlogPost = BlogMeta & { content: string }

const blogsDir = path.join(process.cwd(), 'content/blogs')

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(blogsDir)) return []
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(blogsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? '',
        date: (data.date as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        readTime: data.readTime as string | undefined,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? '',
    date: (data.date as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    readTime: data.readTime as string | undefined,
    content,
  }
}
