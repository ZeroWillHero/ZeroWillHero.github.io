'use client'

import { useState } from 'react'

type ContactData = {
  email: string
  github: string
  githubHandle: string
  linkedin: string
  linkedinHandle: string
  location: string
  availability: string
  tagline: string
}

export default function ContactSection({ contact }: { contact: ContactData }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleChange(e: { target: { name: string; value: string } }) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setSending(true)
    const subject = encodeURIComponent(`Portfolio Contact — ${form.name}`)
    const body = encodeURIComponent(
      `Hi Chameera,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    }, 800)
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-10 md:mb-14">
        <h2
          className="text-[3rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] leading-none text-white reveal dissolve"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          Get In Touch
        </h2>
        <p className="text-zinc-400 text-sm mt-3 max-w-md leading-relaxed reveal dissolve">
          {contact.tagline}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* ── Left column: contact info ── */}
        <div className="flex flex-col gap-3 reveal-left">

          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-4 border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-900/70"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Email</p>
              <p className="text-sm text-white group-hover:text-orange-400 transition-colors duration-200 truncate">
                {contact.email}
              </p>
            </div>
            <span className="text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 text-sm shrink-0">
              →
            </span>
          </a>

          {/* GitHub */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-900/70"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">GitHub</p>
              <p className="text-sm text-white group-hover:text-orange-400 transition-colors duration-200">
                {contact.githubHandle}
              </p>
            </div>
            <span className="text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 text-sm shrink-0">
              →
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-900/70"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">LinkedIn</p>
              <p className="text-sm text-white group-hover:text-orange-400 transition-colors duration-200">
                {contact.linkedinHandle}
              </p>
            </div>
            <span className="text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 text-sm shrink-0">
              →
            </span>
          </a>

          {/* Location */}
          <div className="flex items-center gap-4 border border-zinc-800 rounded-xl p-5 bg-zinc-900/40 backdrop-blur-sm">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <svg width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Location</p>
              <p className="text-sm text-white">{contact.location}</p>
            </div>
          </div>

          {/* Availability pulse */}
          <div className="flex items-center gap-3 pt-1 pl-1">
            <span className="relative flex w-2.5 h-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-zinc-400">{contact.availability}</span>
          </div>
        </div>

        {/* ── Right column: form ── */}
        <div className="reveal-right">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 border border-zinc-800 rounded-2xl p-10 bg-zinc-900/40 backdrop-blur-sm text-center">
              <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <p className="text-white font-semibold text-lg">Email client opened!</p>
              <p className="text-zinc-500 text-sm max-w-xs">
                Your default email app should have opened with the message pre-filled. Hit send when you're ready.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-xs text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hi Chameera, I'd like to talk about..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="group w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 text-black font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 mt-1"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Opening...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M22 2 11 13"/>
                      <path d="M22 2 15 22 11 13 2 9l20-7z"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-zinc-600">
                Opens your email client with the message pre-filled.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
