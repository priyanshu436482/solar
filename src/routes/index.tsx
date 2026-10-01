import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { QuoteModal } from '../components/QuoteModal'
import { Reveal } from '../components/Reveal'
import { SavingsCalculator } from '../components/SavingsCalculator'
import { Faqs, Process, Products, Schemes, Services, SystemSizing } from '../components/Sections'

export const Route = createFileRoute('/')({ component: Home })

const SOCIAL_URL = 'https://www.instagram.com/'

const features = [
  { title: 'Bespoke design', body: 'Every array is engineered around your architecture, never bolted on.' },
  { title: 'Premium hardware', body: 'Tier-one panels and storage with 25-year performance guarantees.' },
  { title: 'Whole-home independence', body: 'Battery backup keeps your home powered through any outage.' },
]

const stats = [
  { value: '12,000+', label: 'Homes powered' },
  { value: '68%', label: 'Average bill reduction' },
  { value: '25 yr', label: 'Performance warranty' },
]

function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const closeQuote = useCallback(() => setQuoteOpen(false), [])
  return (
    <div className="min-h-screen bg-ink text-slate-200">
      <QuoteModal open={quoteOpen} onClose={closeQuote} />
      <header className="animate-rise fixed inset-x-0 top-0 z-10 border-b border-white/5 bg-ink/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main">
          <a href="#top" className="font-display text-xl font-semibold tracking-wide text-gold sm:text-2xl">Sunshine Solar System</a>
          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#services" className="transition-colors hover:text-white">Services</a>
            <a href="#calculator" className="transition-colors hover:text-white">ROI</a>
            <a href="#schemes" className="transition-colors hover:text-white">Schemes</a>
            <a href="#products" className="transition-colors hover:text-white">Products</a>
            <a href="#faqs" className="transition-colors hover:text-white">FAQs</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </div>
          <button type="button" onClick={() => setQuoteOpen(true)} className="rounded-full border border-gold/60 px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-ink">
            Get a quote
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20">
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 animate-glow rounded-full bg-gold/10 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
          <div className="pointer-events-none absolute right-1/2 top-1/2 h-64 w-64 animate-glow rounded-full bg-emerald/15 blur-3xl [animation-delay:3s] sm:h-[28rem] sm:w-[28rem]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald/10 to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="animate-rise text-xs font-medium uppercase tracking-[0.3em] text-emerald">Luxury clean energy</p>
            <h1 className="animate-rise mt-6 font-display text-5xl font-semibold leading-tight text-white sm:text-7xl" style={{ animationDelay: '0.1s' }}>
              Power your home with <span className="text-gold">the sun</span>, beautifully.
            </h1>
            <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400" style={{ animationDelay: '0.2s' }}>
              Refined solar and storage systems for homes that expect more — lower bills, zero compromise, a lighter footprint.
            </p>
            <div className="animate-rise mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.3s' }}>
              <a href="#calculator" className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-[#e3c283] hover:shadow-[0_8px_30px_-8px_rgba(212,175,106,0.6)]">Calculate your savings</a>
              <a href="#why" className="rounded-full border border-white/15 px-8 py-3 font-medium text-white transition-colors hover:bg-white/5">Explore</a>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-surface px-6 py-14">
          <dl className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
              <div>
                <dd className="font-display text-5xl text-gold">{s.value}</dd>
                <dt className="mt-2 text-sm text-slate-400">{s.label}</dt>
              </div>
              </Reveal>
            ))}
          </dl>
        </section>

        <section id="why" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center font-display text-4xl text-white sm:text-5xl">Crafted for the discerning</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-white/10 bg-surface p-8 transition duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(212,175,106,0.25)]">
                <div className="h-1 w-10 rounded bg-emerald" />
                <h3 className="mt-6 text-lg font-medium text-white">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{f.body}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Services />

        <section id="calculator" className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald">ROI calculator</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">See what the sun can save you</h2>
            <Reveal delay={150}>
              <SavingsCalculator />
            </Reveal>
          </div>
        </section>

        <Schemes />
        <Products />
        <SystemSizing />
        <Process />

        <section id="testimonials" className="border-t border-white/5 bg-surface px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-display text-4xl text-white sm:text-5xl">What our clients say</h2>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Reveal key={n} delay={n * 120}>
                <figure className="h-full rounded-2xl border border-dashed border-white/15 p-8 text-left">
                  <blockquote className="text-slate-500">Customer testimonial coming soon.</blockquote>
                  <figcaption className="mt-6 text-sm text-slate-500">Client name · Location</figcaption>
                </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Faqs />

        <section id="contact" className="px-6 py-24 text-center">
          <h2 className="font-display text-4xl text-white sm:text-5xl">Begin your solar journey</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">Speak with an energy advisor and receive a tailored proposal.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={() => setQuoteOpen(true)} className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition-colors hover:bg-[#e3c283]">Get a free quote</button>
            <a href="mailto:hello@sunshinesolar.example" className="rounded-full border border-white/15 px-8 py-3 font-medium text-white transition-colors hover:bg-white/5">hello@sunshinesolar.example</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>© 2026 Sunshine Solar System. All rights reserved.</p>
          <a href={SOCIAL_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
            Follow us on Instagram
          </a>
        </div>
      </footer>
    </div>
  )
}
