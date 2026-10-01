import { useState } from 'react'

// Placeholder assumptions — replace with confirmed company figures.
const RATE_PER_UNIT = 7.5 // blended Gujarat DISCOM tariff, ₹/unit
const UNITS_PER_KW_MONTH = 120
const SQFT_PER_KW = 100
const COST_PER_KW = 60000 // installed cost before subsidy, ₹/kW

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

// PM Surya Ghar: ₹30,000/kW for first 2 kW, ₹18,000 for the 3rd kW, max ₹78,000.
function subsidyFor(kw: number) {
  return Math.min(78000, Math.min(kw, 2) * 30000 + Math.min(Math.max(kw - 2, 0), 1) * 18000)
}

function estimate(monthlyBill: number, roofSqFt: number) {
  const unitsUsed = monthlyBill / RATE_PER_UNIT
  const kwNeeded = unitsUsed / UNITS_PER_KW_MONTH
  const kwRoof = roofSqFt / SQFT_PER_KW
  const systemKw = Math.max(0, Math.min(kwNeeded, kwRoof))
  const monthlyUnits = systemKw * UNITS_PER_KW_MONTH
  const monthlySavings = Math.min(monthlyUnits * RATE_PER_UNIT, monthlyBill)
  const annualSavings = monthlySavings * 12
  const subsidy = subsidyFor(systemKw)
  const netCost = Math.max(0, systemKw * COST_PER_KW - subsidy)
  return {
    systemKw,
    monthlyUnits,
    monthlySavings,
    annualSavings,
    subsidy,
    paybackYears: annualSavings > 0 ? netCost / annualSavings : 0,
  }
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(4500)
  const [roof, setRoof] = useState(350)
  const r = estimate(bill, roof)

  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-surface p-8">
        <label htmlFor="bill" className="block text-sm text-slate-400">
          Average Monthly Electricity Bill (₹)
        </label>
        <input
          id="bill"
          type="number"
          min={0}
          step={100}
          value={bill}
          onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-lg text-white"
        />
        <label htmlFor="roof" className="mt-6 block text-sm text-slate-400">
          Available Shadow-Free Roof Area (sq ft)
        </label>
        <input
          id="roof"
          type="number"
          min={0}
          step={10}
          value={roof}
          onChange={(e) => setRoof(Math.max(0, Number(e.target.value)))}
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-lg text-white"
        />
        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          Estimates assume ₹{RATE_PER_UNIT}/unit, {UNITS_PER_KW_MONTH} units per kW per
          month, {SQFT_PER_KW} sq ft per kW and ₹{COST_PER_KW.toLocaleString('en-IN')}/kW
          installed cost. PM Surya Ghar subsidy: ₹30,000/kW up to 2 kW, ₹18,000 for the
          3rd kW, max ₹78,000. Actual savings vary.
        </p>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-surface p-8" aria-live="polite">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald">Annual Savings</p>
        <p className="mt-3 font-display text-5xl text-gold sm:text-6xl">
          {inr.format(r.annualSavings)}
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
          <Stat label="Recommended kW" value={`${r.systemKw.toFixed(1)} kW`} />
          <Stat label="Monthly Generation" value={`${Math.round(r.monthlyUnits)} units`} />
          <Stat label="Monthly Bill Savings" value={inr.format(r.monthlySavings)} />
          <Stat label="PM Surya Ghar Subsidy" value={inr.format(r.subsidy)} />
          <Stat label="Estimated Payback Period" value={`${r.paybackYears.toFixed(1)} years`} />
        </dl>
        <a
          href="#contact"
          className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-[#e3c283]"
        >
          Get your precise proposal
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
