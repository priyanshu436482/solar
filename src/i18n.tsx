import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'gu'

const en = {
  brand: 'Sunshine Solar System',
  navServices: 'Services', navRoi: 'ROI', navSchemes: 'Schemes', navProducts: 'Products', navFaqs: 'FAQs', navContact: 'Contact',
  getQuote: 'Get a quote', getFreeQuote: 'Get a free quote',
  heroEyebrow: 'Luxury clean energy',
  heroTitle1: 'Power your home with ', heroTitleEm: 'the sun', heroTitle2: ', beautifully.',
  heroBody: 'Refined solar and storage systems for homes that expect more — lower bills, zero compromise, a lighter footprint.',
  heroCta: 'Calculate your savings', heroExplore: 'Explore',
  stat1: 'Homes powered', stat2: 'Average bill reduction', stat3: 'Performance warranty', stat3v: '25 yr',
  whyTitle: 'Crafted for the discerning',
  f1t: 'Bespoke design', f1b: 'Every array is engineered around your architecture, never bolted on.',
  f2t: 'Premium hardware', f2b: 'Tier-one panels and storage with 25-year performance guarantees.',
  f3t: 'Whole-home independence', f3b: 'Battery backup keeps your home powered through any outage.',
  svcEyebrow: 'Services', svcTitle: 'Complete solar, end to end',
  s1t: 'Residential rooftop solar', s1b: 'Custom-designed on-grid, off-grid and hybrid systems for homes and villas.',
  s2t: 'Commercial & industrial', s2b: 'High-yield installations that cut operating costs for businesses.',
  s3t: 'Battery storage', s3b: 'Lithium backup so your home stays powered through any outage.',
  s4t: 'Maintenance & monitoring', s4b: 'Cleaning, inspections and live performance tracking, year-round.',
  roiEyebrow: 'ROI calculator', roiTitle: 'See what the sun can save you',
  schEyebrow: 'Government schemes', schTitle: 'Subsidies that shorten your payback',
  schBody: 'We handle the paperwork end to end. Figures are indicative — confirm current rates with your advisor.',
  sc1t: 'Central subsidy', sc1b: 'Up to ₹78,000 for residential rooftop systems under PM Surya Ghar.',
  sc2t: 'State incentives', sc2b: 'Additional top-ups and net-metering benefits vary by state.',
  sc3t: 'Net metering', sc3b: 'Export surplus power to the grid and earn bill credits.',
  sc4t: 'Low-interest loans', sc4b: 'Collateral-free green financing from partner banks.',
  prodEyebrow: 'Products', prodTitle: 'Only tier-one hardware',
  p1t: 'Mono PERC Panels', p1b: '540–600 W · 25-year performance warranty',
  p2t: 'Hybrid Inverters', p2b: '3–10 kW · Wi-Fi monitoring · 10-year warranty',
  p3t: 'Lithium Battery Packs', p3b: '5–15 kWh · 6,000+ cycles',
  p4t: 'Mounting & Safety Kits', p4b: 'Corrosion-proof structures · surge protection',
  sizeEyebrow: 'System sizing', sizeTitle: 'Find the right size for your home',
  sizeBill: 'Monthly electricity bill', sizeKw: 'Recommended system', sizeArea: 'Shadow-free roof area', sizeUnits: 'Units generated / month',
  kwUnit: 'kW', sqft: 'sq ft',
  procEyebrow: 'Process', procTitle: 'Five steps to sunshine',
  pr1t: 'Consult', pr1b: 'Free site survey and energy audit.',
  pr2t: 'Design', pr2b: 'Bespoke layout, proposal and transparent pricing.',
  pr3t: 'Approvals', pr3b: 'Subsidy, net-metering and permits handled by us.',
  pr4t: 'Install', pr4b: 'Certified crew, typically 2–5 days.',
  pr5t: 'Activate', pr5b: 'Grid sync, monitoring setup and lifetime support.',
  testTitle: 'What our clients say', testBody: 'Customer testimonial coming soon.', testName: 'Client name · Location',
  faqEyebrow: 'FAQs', faqTitle: 'Questions, answered',
  q1: 'How long does installation take?', a1: 'Most residential systems are installed in 2–5 days after approvals.',
  q2: 'What happens on cloudy days or at night?', a2: 'Net metering draws from the grid; a battery can cover critical loads.',
  q3: 'How much maintenance is needed?', a3: 'Periodic panel cleaning and an annual inspection, included in our care plans.',
  q4: 'What is the payback period?', a4: 'Typically 3–5 years after subsidy, depending on usage and tariff.',
  ctaTitle: 'Begin your solar journey', ctaBody: 'Speak with an energy advisor and receive a tailored proposal.',
  rights: '© 2026 Sunshine Solar System. All rights reserved.', instagram: 'Follow us on Instagram',
  calcBill: 'Average monthly electric bill', calcSun: 'Sun exposure at your home',
  sunModerate: 'Moderate', sunGood: 'Good', sunExcellent: 'Excellent',
  calcNote1: 'Estimates assume ₹', calcNote2: '/unit, 3% annual rate increases, a 30% government subsidy and a system sized to offset about 90% of your usage. Actual savings vary by location and roof.',
  calcNet: '-year net savings', calcFirst: 'First-year savings', calcPayback: 'Payback period', years: 'years',
  calcSystem: 'Recommended system', calcInvest: 'Net investment', calcCo2: 'CO₂ avoided / year', tons: 'tons',
  calcCta: 'Get your precise proposal',
  qTitle: 'Get a quote', qIntro: "Tell us about your home and we'll design your system.",
  qName: 'Name', qNamePh: 'Your full name', qEmail: 'Email', qPhone: 'Phone number', qMsg: 'Message', qMsgPh: 'Tell us about your project',
  qSubmit: 'Request quote', qThanks: 'Thank you', qThanksBody: 'Your request has been received. Our team will be in touch shortly.', close: 'Close',
  langLabel: 'Language',
}

export type Key = keyof typeof en

const gu: Record<Key, string> = {
  brand: 'સનશાઇન સોલાર સિસ્ટમ',
  navServices: 'સેવાઓ', navRoi: 'બચત', navSchemes: 'યોજનાઓ', navProducts: 'ઉત્પાદનો', navFaqs: 'પ્રશ્નો', navContact: 'સંપર્ક',
  getQuote: 'ક્વોટ મેળવો', getFreeQuote: 'મફત ક્વોટ મેળવો',
  heroEyebrow: 'પ્રીમિયમ સ્વચ્છ ઊર્જા',
  heroTitle1: 'તમારા ઘરને ', heroTitleEm: 'સૂર્યથી', heroTitle2: ' સુંદર રીતે રોશન કરો.',
  heroBody: 'વધુ અપેક્ષા રાખતા ઘરો માટે અત્યાધુનિક સોલાર અને સ્ટોરેજ સિસ્ટમ — ઓછું બિલ, કોઈ સમાધાન નહીં, ઓછો પર્યાવરણીય બોજ.',
  heroCta: 'તમારી બચતની ગણતરી કરો', heroExplore: 'વધુ જુઓ',
  stat1: 'વીજળીથી ચાલતા ઘરો', stat2: 'સરેરાશ બિલમાં ઘટાડો', stat3: 'પરફોર્મન્સ વોરંટી', stat3v: '25 વર્ષ',
  whyTitle: 'ચોક્કસ પસંદગી ધરાવનારાઓ માટે',
  f1t: 'તમારા માટે ખાસ ડિઝાઇન', f1b: 'દરેક સિસ્ટમ તમારા ઘરના બાંધકામ મુજબ તૈયાર થાય છે, ઉપરથી જોડાયેલી નહીં.',
  f2t: 'પ્રીમિયમ સાધનો', f2b: '25 વર્ષની પરફોર્મન્સ ગેરંટી સાથે ટોચની કંપનીના પેનલ અને સ્ટોરેજ.',
  f3t: 'સંપૂર્ણ ઘરની સ્વતંત્રતા', f3b: 'બેટરી બેકઅપ વીજળી જાય ત્યારે પણ તમારા ઘરને ચાલુ રાખે છે.',
  svcEyebrow: 'સેવાઓ', svcTitle: 'શરૂઆતથી અંત સુધી સંપૂર્ણ સોલાર',
  s1t: 'રહેણાંક રૂફટોપ સોલાર', s1b: 'ઘરો અને બંગલા માટે ઓન-ગ્રિડ, ઓફ-ગ્રિડ અને હાઇબ્રિડ સિસ્ટમ.',
  s2t: 'વાણિજ્યિક અને ઔદ્યોગિક', s2b: 'વ્યવસાયોનો ખર્ચ ઘટાડતા ઉચ્ચ ઉત્પાદન આપતા સ્થાપનો.',
  s3t: 'બેટરી સ્ટોરેજ', s3b: 'લિથિયમ બેકઅપ, જેથી વીજળી જાય ત્યારે પણ ઘર ચાલુ રહે.',
  s4t: 'જાળવણી અને મોનિટરિંગ', s4b: 'આખું વર્ષ સફાઈ, નિરીક્ષણ અને લાઇવ પરફોર્મન્સ ટ્રેકિંગ.',
  roiEyebrow: 'બચત કેલ્ક્યુલેટર', roiTitle: 'જુઓ, સૂર્ય તમને કેટલી બચત કરાવી શકે',
  schEyebrow: 'સરકારી યોજનાઓ', schTitle: 'સબસિડી જે તમારો પેબેક સમય ઘટાડે',
  schBody: 'કાગળકામ અમે સંભાળીએ છીએ. આંકડા અંદાજિત છે — વર્તમાન દરો તમારા સલાહકાર પાસેથી ચકાસો.',
  sc1t: 'કેન્દ્રીય સબસિડી', sc1b: 'પીએમ સૂર્ય ઘર હેઠળ રહેણાંક રૂફટોપ સિસ્ટમ માટે ₹78,000 સુધી.',
  sc2t: 'રાજ્ય પ્રોત્સાહન', sc2b: 'વધારાના લાભ અને નેટ-મીટરિંગ લાભ રાજ્ય મુજબ બદલાય છે.',
  sc3t: 'નેટ મીટરિંગ', sc3b: 'વધારાની વીજળી ગ્રિડને આપો અને બિલમાં ક્રેડિટ મેળવો.',
  sc4t: 'ઓછા વ્યાજની લોન', sc4b: 'ભાગીદાર બેંકો તરફથી જામીન વગરનું ગ્રીન ફાઇનાન્સ.',
  prodEyebrow: 'ઉત્પાદનો', prodTitle: 'ફક્ત ટોચની કક્ષાના સાધનો',
  p1t: 'મોનો PERC પેનલ', p1b: '540–600 W · 25 વર્ષની પરફોર્મન્સ વોરંટી',
  p2t: 'હાઇબ્રિડ ઇન્વર્ટર', p2b: '3–10 kW · વાઇ-ફાઇ મોનિટરિંગ · 10 વર્ષની વોરંટી',
  p3t: 'લિથિયમ બેટરી પેક', p3b: '5–15 kWh · 6,000+ સાયકલ',
  p4t: 'માઉન્ટિંગ અને સેફ્ટી કિટ', p4b: 'કાટ-રોધક સ્ટ્રક્ચર · સર્જ પ્રોટેક્શન',
  sizeEyebrow: 'સિસ્ટમ સાઇઝ', sizeTitle: 'તમારા ઘર માટે યોગ્ય કદ શોધો',
  sizeBill: 'માસિક વીજળી બિલ', sizeKw: 'ભલામણ કરેલ સિસ્ટમ', sizeArea: 'છાંયા વગરનો છત વિસ્તાર', sizeUnits: 'દર મહિને ઉત્પન્ન યુનિટ',
  kwUnit: 'kW', sqft: 'ચો. ફૂટ',
  procEyebrow: 'પ્રક્રિયા', procTitle: 'સૂર્યપ્રકાશ સુધીના પાંચ પગલાં',
  pr1t: 'સલાહ', pr1b: 'મફત સાઇટ સર્વે અને ઊર્જા ઓડિટ.',
  pr2t: 'ડિઝાઇન', pr2b: 'ખાસ લેઆઉટ, પ્રપોઝલ અને પારદર્શક કિંમત.',
  pr3t: 'મંજૂરીઓ', pr3b: 'સબસિડી, નેટ-મીટરિંગ અને પરવાનગીઓ અમે સંભાળીએ છીએ.',
  pr4t: 'સ્થાપન', pr4b: 'પ્રમાણિત ટીમ, સામાન્ય રીતે 2–5 દિવસ.',
  pr5t: 'શરૂઆત', pr5b: 'ગ્રિડ સિંક, મોનિટરિંગ સેટઅપ અને આજીવન સપોર્ટ.',
  testTitle: 'અમારા ગ્રાહકો શું કહે છે', testBody: 'ગ્રાહકનો અભિપ્રાય ટૂંક સમયમાં આવશે.', testName: 'ગ્રાહકનું નામ · સ્થળ',
  faqEyebrow: 'વારંવાર પૂછાતા પ્રશ્નો', faqTitle: 'તમારા પ્રશ્નોના જવાબ',
  q1: 'સ્થાપનમાં કેટલો સમય લાગે છે?', a1: 'મોટાભાગની રહેણાંક સિસ્ટમ મંજૂરી પછી 2–5 દિવસમાં લગાવાય છે.',
  q2: 'વાદળછાયા દિવસે કે રાત્રે શું થાય?', a2: 'નેટ મીટરિંગમાં ગ્રિડમાંથી વીજળી મળે છે; બેટરી જરૂરી લોડ ચલાવી શકે છે.',
  q3: 'કેટલી જાળવણી જરૂરી છે?', a3: 'સમયાંતરે પેનલની સફાઈ અને વાર્ષિક નિરીક્ષણ, જે અમારા કેર પ્લાનમાં સામેલ છે.',
  q4: 'પેબેક સમય કેટલો છે?', a4: 'ઉપયોગ અને ટેરિફ મુજબ, સબસિડી પછી સામાન્ય રીતે 3–5 વર્ષ.',
  ctaTitle: 'તમારી સોલાર સફર શરૂ કરો', ctaBody: 'ઊર્જા સલાહકાર સાથે વાત કરો અને તમારા માટે તૈયાર પ્રપોઝલ મેળવો.',
  rights: '© 2026 સનશાઇન સોલાર સિસ્ટમ. સર્વાધિકાર સુરક્ષિત.', instagram: 'ઇન્સ્ટાગ્રામ પર અમને ફોલો કરો',
  calcBill: 'સરેરાશ માસિક વીજળી બિલ', calcSun: 'તમારા ઘરે સૂર્યપ્રકાશ',
  sunModerate: 'મધ્યમ', sunGood: 'સારો', sunExcellent: 'ઉત્તમ',
  calcNote1: 'અંદાજ ₹', calcNote2: '/યુનિટ, વાર્ષિક 3% દર વધારો, 30% સરકારી સબસિડી અને તમારા વપરાશના લગભગ 90% સરભર કરે તેવી સિસ્ટમ પર આધારિત છે. વાસ્તવિક બચત સ્થળ અને છત મુજબ બદલાય છે.',
  calcNet: ' વર્ષની ચોખ્ખી બચત', calcFirst: 'પહેલા વર્ષની બચત', calcPayback: 'પેબેક સમય', years: 'વર્ષ',
  calcSystem: 'ભલામણ કરેલ સિસ્ટમ', calcInvest: 'ચોખ્ખું રોકાણ', calcCo2: 'દર વર્ષે બચેલ CO₂', tons: 'ટન',
  calcCta: 'તમારું ચોક્કસ પ્રપોઝલ મેળવો',
  qTitle: 'ક્વોટ મેળવો', qIntro: 'તમારા ઘર વિશે જણાવો, અમે તમારી સિસ્ટમ ડિઝાઇન કરીશું.',
  qName: 'નામ', qNamePh: 'તમારું પૂરું નામ', qEmail: 'ઇમેઇલ', qPhone: 'ફોન નંબર', qMsg: 'સંદેશ', qMsgPh: 'તમારા પ્રોજેક્ટ વિશે જણાવો',
  qSubmit: 'ક્વોટની વિનંતી કરો', qThanks: 'આભાર', qThanksBody: 'તમારી વિનંતી મળી ગઈ છે. અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે.', close: 'બંધ કરો',
  langLabel: 'ભાષા',
}

const dicts: Record<Lang, Record<Key, string>> = { en, gu }
const STORAGE_KEY = 'lang'

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: Key) => string
}

const Ctx = createContext<I18n | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'gu') setLangState(saved)
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const value = useMemo<I18n>(() => ({ lang, setLang, t: (k) => dicts[lang][k] }), [lang, setLang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n(): I18n {
  const v = useContext(Ctx)
  if (!v) throw new Error('useI18n must be used inside LanguageProvider')
  return v
}

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n()
  const opts: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'gu', label: 'ગુ' },
  ]
  return (
    <div role="group" aria-label={t('langLabel')} className="flex rounded-full border border-white/15 p-0.5 text-xs">
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors ${lang === o.code ? 'bg-gold text-ink' : 'text-slate-400 hover:text-white'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
