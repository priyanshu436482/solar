import { useState } from 'react'
import { useI18n } from '../i18n'

const SUN_OPTIONS = [
  { label: 'sunModerate', peakHours: 3.8 },
  { label: 'sunGood', peakHours: 4.6 },
  { label: 'sunExcellent', peakHours: 5.6 },
] as const

const RATE_PER_KWH = 8
const COST_PER_WATT = 50
const SUBSIDY = 0.3
const PRICE_ESCALATION = 0.03
const PANEL_DEGRADATION = 0.005
const CO2_KG_PER_KWH = 0.39
const YEARS = 25

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function estimate(monthlyBill: number, sunIndex: number) {
  const peakHours = SUN_OPTIONS[sunIndex].peakHours
  const annualKwh = (monthlyBill * 12) / RATE_PER_KWH
  // Size the system to offset ~90% of usage, with a 14% system loss factor.
  const systemKw = (annualKwh * 0.9) / (peakHours * 365 * 0.86)
  const netCost = systemKw * 1000 * COST_PER_WATT * (1 - SUBSIDY)
  const yearOneKwh = systemKw * peakHours * 365 * 0.86

  let total = 0
  for (let y = 0; y < YEARS; y++) {
    total +=
      yearOneKwh *
      (1 - PANEL_DEGRADATION) ** y *
      RATE_PER_KWH *
      (1 + PRICE_ESCALATION) ** y
  }
  const yearOneSavings = yearOneKwh * RATE_PER_KWH
  return {
    systemKw,
    netCost,
    yearOneSavings,
    lifetimeSavings: total - netCost,
    paybackYears: netCost / yearOneSavings,
    co2Tons: (yearOneKwh * CO2_KG_PER_KWH) / 1000,
  }
}

export function SavingsCalculator() {
  const { t } = useI18n()
  const [bill, setBill] = useState(3000)
  const [sun, setSun] = useState(1)
  const r = estimate(bill, sun)

  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-surface p-8">
        <label htmlFor="bill" className="flex items-baseline justify-between text-sm text-slate-400">
          {t('calcBill')}
          <span className="font-display text-3xl text-gold">{inr.format(bill)}</span>
        </label>
        <input
          id="bill"
          type="range"
          min={500}
          max={15000}
          step={100}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-4 w-full accent-[#d4af6a]"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>₹500</span>
          <span>₹15,000</span>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm text-slate-400">{t('calcSun')}</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {SUN_OPTIONS.map((o, i) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={sun === i}
                onClick={() => setSun(i)}
                className={`rounded-lg border px-3 py-2 text-sm transition duration-200 active:scale-95 ${
                  sun === i
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-slate-400 hover:border-white/30'
                }`}
              >
                {t(o.label)}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          {t('calcNote1')}{RATE_PER_KWH}{t('calcNote2')}
        </p>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-surface p-8" aria-live="polite">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald">
          {YEARS}{t('calcNet')}
        </p>
        <p key={Math.round(r.lifetimeSavings / 500)} className="animate-rise mt-3 font-display text-5xl text-gold sm:text-6xl">
          {inr.format(Math.max(0, r.lifetimeSavings))}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
          <Stat label={t('calcFirst')} value={inr.format(r.yearOneSavings)} />
          <Stat label={t('calcPayback')} value={`${r.paybackYears.toFixed(1)} ${t('years')}`} />
          <Stat label={t('calcSystem')} value={`${r.systemKw.toFixed(1)} ${t('kwUnit')}`} />
          <Stat label={t('calcInvest')} value={inr.format(r.netCost)} />
          <Stat label={t('calcCo2')} value={`${r.co2Tons.toFixed(1)} ${t('tons')}`} />
        </dl>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-[#e3c283]"
        >
          {t('calcCta')}
        </a>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 text-lg text-white">{value}</dd>
    </div>
  )
}
