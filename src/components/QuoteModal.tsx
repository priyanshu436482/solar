import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'

interface QuoteModalProps {
  open: boolean
  onClose: () => void
}

const fieldClass =
  'mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white placeholder:text-slate-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const firstField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setSent(false)
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="animate-rise relative max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/30 bg-surface p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute right-4 top-4 text-2xl leading-none text-slate-400 transition-colors hover:text-white"
        >
          ×
        </button>
        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-1 w-10 rounded bg-emerald" />
            <h2 id="quote-title" className="mt-6 font-display text-3xl text-white">{t('qThanks')}</h2>
            <p className="mt-3 text-slate-400">{t('qThanksBody')}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-gold px-8 py-3 font-medium text-ink transition-colors hover:bg-[#e3c283]"
            >
              {t('close')}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <div className="h-1 w-10 rounded bg-emerald" />
              <h2 id="quote-title" className="mt-4 font-display text-3xl text-white">{t('qTitle')}</h2>
              <p className="mt-2 text-sm text-slate-400">{t('qIntro')}</p>
            </div>
            <label className="block text-sm text-slate-300">
              {t('qName')}
              <input ref={firstField} name="name" type="text" required autoComplete="name" className={fieldClass} placeholder={t('qNamePh')} />
            </label>
            <label className="block text-sm text-slate-300">
              {t('qEmail')}
              <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
            </label>
            <label className="block text-sm text-slate-300">
              {t('qPhone')}
              <input name="phone" type="tel" required autoComplete="tel" className={fieldClass} placeholder="(555) 123-4567" />
            </label>
            <label className="block text-sm text-slate-300">
              {t('qMsg')}
              <textarea name="message" rows={4} required className={fieldClass} placeholder={t('qMsgPh')} />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-gold px-8 py-3 font-medium text-ink transition duration-300 hover:bg-[#e3c283]"
            >
              {t('qSubmit')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
