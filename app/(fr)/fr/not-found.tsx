import type { Metadata } from 'next'
import NotFoundPage from '@/components/not-found-page'
import dictionary from '@/dictionaries/fr.json'

export const metadata: Metadata = {
  title: dictionary.meta.notFound.title,
  description: dictionary.meta.notFound.description,
}

export default function NotFound() {
  return (
    <NotFoundPage
      errorLine='no such file or directory: /this-page-does-not-exist'
      message='La page que vous cherchez a été déplacée, supprimée, renommée — ou n’a jamais existé.'
      ctaHref='/fr'
      ctaLabel='cd ~/ → retour à l’accueil'
    />
  )
}
