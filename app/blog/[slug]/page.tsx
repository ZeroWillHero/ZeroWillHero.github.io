import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bebas_Neue } from 'next/font/google'
import { NavBar } from '@/app/components/NavBar'
import BlogContent from '@/app/components/BlogContent'
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' })

export async function generateStaticParams() {
  return getAllBlogs().map(blog => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) return {}
  return { title: `${blog.title} — Chameera Sandakelum`, description: blog.description }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) notFound()

  return (
    <main className="p-2 min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white animate-page-fade-in">
      <section className="relative mx-auto w-full max-w-3xl px-4 pt-16 sm:pt-20 md:pt-28 pb-20">
        <NavBar />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-orange-400 transition-colors duration-200 mb-6 md:mb-10 nav-item-smooth"
        >
          ← Back to blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <h1 className={`${bebasNeue.className} text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] leading-none text-white mb-4`}>
          {blog.title}
        </h1>

        <p className="text-zinc-400 text-sm mb-2">{blog.description}</p>

        <div className="flex items-center gap-4 text-xs text-zinc-600 mb-10 pb-8 border-b border-zinc-800">
          <span>{blog.date}</span>
          {blog.readTime && <><span>·</span><span>{blog.readTime}</span></>}
        </div>

        <BlogContent content={blog.content} />
      </section>
    </main>
  )
}
