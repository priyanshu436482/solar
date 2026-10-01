import { useState } from 'react'
import { Reveal } from './Reveal'

function Heading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-slate-400">{body}</p> : null}
    </div>
  )
}

const card =
  'h-full rounded-2xl border border-white/10 bg-surface p-8 transition duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(212,175,106,0.25)]'

const services = [
  { title: 'Residential rooftop solar', body: 'Custom-designed on-grid, off-grid and hybrid systems for homes and villas.' },
  { title: 'Commercial & industrial', body: 'High-yield installations that cut operating costs for businesses.' },
  { title: 'Battery storage', body: 'Lithium backup so your home stays powered through any outage.' },
  { title: 'Maintenance & monitoring', body: 'Cleaning, inspections and live performance tracking, year-round.' },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="Services" title="Complete solar, end to end" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <div className={card}>
              <div className="h-1 w-10 rounded bg-emerald" />
              <h3 className="mt-6 text-lg font-medium text-white">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const schemes = [
  { name: 'Central subsidy', detail: 'Up to ₹78,000 for residential rooftop systems under PM Surya Ghar.' },
  { name: 'State incentives', detail: 'Additional top-ups and net-metering benefits vary by state.' },
  { name: 'Net metering', detail: 'Export surplus power to the grid and earn bill credits.' },
  { name: 'Low-interest loans', detail: 'Collateral-free green financing from partner banks.' },
]

export function Schemes() {
  return (
    <section id="schemes" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Heading eyebrow="Government schemes" title="Subsidies that shorten your payback" body="We handle the paperwork end to end. Figures are indicative — confirm current rates with your advisor." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {schemes.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-gold/20 bg-ink p-8">
                <h3 className="font-display text-2xl text-gold">{s.name}</h3>
                <p className="mt-3 text-slate-400">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const products = [
  { name: 'Mono PERC Panels', spec: '540–600 W · 25-year performance warranty' },
  { name: 'Hybrid Inverters', spec: '3–10 kW · Wi-Fi monitoring · 10-year warranty' },
  { name: 'Lithium Battery Packs', spec: '5–15 kWh · 6,000+ cycles' },
  { name: 'Mounting & Safety Kits', spec: 'Corrosion-proof structures · surge protection' },
]

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="Products" title="Only tier-one hardware" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <div className={card}>
              <h3 className="font-display text-2xl text-white">{p.name}</h3>
              <p className="mt-2 text-slate-400">{p.spec}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function SystemSizing() {
  const [bill, setBill] = useState(4000)
  // ~ ₹8/unit, ~120 units per kW per month
  const kw = Math.max(1, Math.round(bill / 8 / 120))
  const area = kw * 100
  const units = kw * 120
  return (
    <section id="sizing" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="System sizing" title="Find the right size for your home" />
        <div className="mt-12 rounded-2xl border border-white/10 bg-ink p-8">
          <label htmlFor="bill" className="flex justify-between text-sm text-slate-400">
            <span>Monthly electricity bill</span>
            <span className="text-gold">₹{bill.toLocaleString('en-IN')}</span>
          </label>
          <input id="bill" type="range" min={1000} max={30000} step={500} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="mt-4 w-full accent-[#d4af6a]" />
          <dl className="mt-8 grid gap-6 text-center sm:grid-cols-3">
            <div><dd className="font-display text-4xl text-gold">{kw} kW</dd><dt className="mt-1 text-sm text-slate-400">Recommended system</dt></div>
            <div><dd className="font-display text-4xl text-emerald">{area} sq ft</dd><dt className="mt-1 text-sm text-slate-400">Shadow-free roof area</dt></div>
            <div><dd className="font-display text-4xl text-white">{units}</dd><dt className="mt-1 text-sm text-slate-400">Units generated / month</dt></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

const steps = [
  ['Consult', 'Free site survey and energy audit.'],
  ['Design', 'Bespoke layout, proposal and transparent pricing.'],
  ['Approvals', 'Subsidy, net-metering and permits handled by us.'],
  ['Install', 'Certified crew, typically 2–5 days.'],
  ['Activate', 'Grid sync, monitoring setup and lifetime support.'],
]

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="Process" title="Five steps to sunshine" />
      <ol className="mt-14 grid gap-6 md:grid-cols-5">
        {steps.map(([t, b], i) => (
          <Reveal key={t} delay={i * 100}>
            <li className="h-full list-none rounded-2xl border border-white/10 bg-surface p-6">
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-medium text-white">{t}</h3>
              <p className="mt-2 text-sm text-slate-400">{b}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

const faqs = [
  ['How long does installation take?', 'Most residential systems are installed in 2–5 days after approvals.'],
  ['What happens on cloudy days or at night?', 'Net metering draws from the grid; a battery can cover critical loads.'],
  ['How much maintenance is needed?', 'Periodic panel cleaning and an annual inspection, included in our care plans.'],
  ['What is the payback period?', 'Typically 3–5 years after subsidy, depending on usage and tariff.'],
]

export function Faqs() {
  return (
    <section id="faqs" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="FAQs" title="Questions, answered" />
        <div className="mt-12 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-white/10 bg-ink p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white">
                {q}
                <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-400">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
