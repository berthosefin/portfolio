export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export function pageAlternates(path: string) {
  return {
    languages: {
      en: `${SITE_URL}${path}`,
      fr: `${SITE_URL}/fr${path === '/' ? '' : path}`,
      'x-default': `${SITE_URL}${path}`
    }
  }
}
