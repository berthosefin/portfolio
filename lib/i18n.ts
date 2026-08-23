import en from '@/dictionaries/en.json'
import fr from '@/dictionaries/fr.json'

export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export const localePrefix: Record<Locale, string> = { en: '', fr: '/fr' }
