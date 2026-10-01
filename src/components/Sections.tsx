import { useState } from 'react'
import { useI18n } from '../i18n'
import type { Key } from '../i18n'
import { Reveal } from './Reveal'

function Heading({ eyebrow, title, body }: { eyebrow: Key; title: Key; body?: Key }) {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald">{t(eyebrow)}</p>
      <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">{t(title)}</h2>
      {body ? <p className="mt-4 text-slate-400">{t(body)}</p> : null}
    </div>
  )
}

const card =
  'h-full rounded-2xl border border-white/10 bg-surface p-8 transition duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(212,175,106,0.25)]'

const services = [['s1t', 's1b'], ['s2t', 's2b'], ['s3t', 's3b'], ['s4t', 's4b']] as const

export function Services() {
  const { t } = useI18n()
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="svcEyebrow" title="svcTitle" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(([title, body], i) => (
          <Reveal key={title} delay={i * 100}>
            <div className={card}>
              <div className="h-1 w-10 rounded bg-emerald" />
              <h3 className="mt-6 text-lg font-medium text-white">{t(title)}</h3>
              <p className="mt-3 leading-relaxed text-slate-400">{t(body)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const schemes = [['sc1t', 'sc1b'], ['sc2t', 'sc2b'], ['sc3t', 'sc3b'], ['sc4t', 'sc4b']] as const

export function Schemes() {
  const { t } = useI18n()
  return (
    <section id="schemes" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Heading eyebrow="schEyebrow" title="schTitle" body="schBody" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {schemes.map(([name, detail], i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-gold/20 bg-ink p-8">
                <h3 className="font-display text-2xl text-gold">{t(name)}</h3>
                <p className="mt-3 text-slate-400">{t(detail)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const products = [['p1t', 'p1b'], ['p2t', 'p2b'], ['p3t', 'p3b'], ['p4t', 'p4b']] as const

export function Products() {
  const { t } = useI18n()
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="prodEyebrow" title="prodTitle" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {products.map(([name, spec], i) => (
          <Reveal key={name} delay={i * 100}>
            <div className={card}>
              <h3 className="font-display text-2xl text-white">{t(name)}</h3>
              <p className="mt-2 text-slate-400">{t(spec)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function SystemSizing() {
  const { t } = useI18n()
  const [bill, setBill] = useState(4000)
  // ~ ₹8/unit, ~120 units per kW per month
  const kw = Math.max(1, Math.round(bill / 8 / 120))
  const area = kw * 100
  const units = kw * 120
  return (
    <section id="sizing" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="sizeEyebrow" title="sizeTitle" />
        <div className="mt-12 rounded-2xl border border-white/10 bg-ink p-8">
          <label htmlFor="bill" className="flex justify-between text-sm text-slate-400">
            <span>{t('sizeBill')}</span>
            <span className="text-gold">₹{bill.toLocaleString('en-IN')}</span>
          </label>
          <input id="bill" type="range" min={1000} max={30000} step={500} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="mt-4 w-full accent-[#d4af6a]" />
          <dl className="mt-8 grid gap-6 text-center sm:grid-cols-3">
            <div><dd className="font-display text-4xl text-gold">{kw} {t('kwUnit')}</dd><dt className="mt-1 text-sm text-slate-400">{t('sizeKw')}</dt></div>
            <div><dd className="font-display text-4xl text-emerald">{area} {t('sqft')}</dd><dt className="mt-1 text-sm text-slate-400">{t('sizeArea')}</dt></div>
            <div><dd className="font-display text-4xl text-white">{units}</dd><dt className="mt-1 text-sm text-slate-400">{t('sizeUnits')}</dt></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

const steps = [['pr1t', 'pr1b'], ['pr2t', 'pr2b'], ['pr3t', 'pr3b'], ['pr4t', 'pr4b'], ['pr5t', 'pr5b']] as const

export function Process() {
  const { t } = useI18n()
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-24">
      <Heading eyebrow="procEyebrow" title="procTitle" />
      <ol className="mt-14 grid gap-6 md:grid-cols-5">
        {steps.map(([title, body], i) => (
          <Reveal key={title} delay={i * 100}>
            <li className="h-full list-none rounded-2xl border border-white/10 bg-surface p-6">
              <span className="font-display text-4xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-medium text-white">{t(title)}</h3>
              <p className="mt-2 text-sm text-slate-400">{t(body)}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

const faqs = [['q1', 'a1'], ['q2', 'a2'], ['q3', 'a3'], ['q4', 'a4']] as const

export function Faqs() {
  const { t } = useI18n()
  return (
    <section id="faqs" className="border-t border-white/5 bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Heading eyebrow="faqEyebrow" title="faqTitle" />
        <div className="mt-12 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-white/10 bg-ink p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white">
                {t(q)}
                <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-400">{t(a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
