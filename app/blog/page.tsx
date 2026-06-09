import type { Metadata } from 'next'
import Link from 'next/link'
import { Bebas_Neue } from 'next/font/google'
import { NavBar } from '@/app/components/NavBar'
import GsapReveal from '@/app/components/GsapReveal'
import { getAllBlogs } from '@/lib/blogs'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Blog — Chameera Sandakelum',
  description: 'Articles on backend development, mobile apps, and software engineering.',
}

export default function BlogPage() {
  const blogs = getAllBlogs()

  return (
    <main className="p-2 min-h-screen bg-linear-to-br from-black via-zinc-900 to-zinc-700 text-white animate-page-fade-in">
      <section className="relative mx-auto w-full max-w-4xl px-4 pt-16 sm:pt-20 md:pt-28 pb-16">
        <NavBar />

        <h1 className={`${bebasNeue.className} text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none text-white mb-2 reveal dissolve`}>
          Blog
        </h1>
        <p className="text-zinc-400 text-sm mb-12 reveal dissolve">
          Thoughts, guides, and notes from my journey as a developer.
        </p>

        {blogs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {blogs.map(blog => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block reveal dissolve">
                <article className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/60 group-hover:bg-zinc-900/70">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {blog.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-orange-400 border border-orange-500/30 rounded-full px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className={`${bebasNeue.className} text-2xl md:text-3xl text-white leading-tight mb-2 group-hover:text-orange-400 transition-colors duration-200`}>
                    {blog.title}
                  </h2>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-zinc-600">
                    <span>{blog.date}</span>
                    {blog.readTime && <span>·</span>}
                    {blog.readTime && <span>{blog.readTime}</span>}
                    <span className="ml-auto text-orange-500 group-hover:translate-x-1 transition-transform duration-200">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
      <GsapReveal />
    </main>
  )
}
