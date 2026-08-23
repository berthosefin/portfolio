import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dictionary from '@/dictionaries/fr.json'

export function generateMetadata(): Metadata {
  return {
    title: dictionary.meta.notFound.title,
    description: dictionary.meta.notFound.description
  }
}

export default function CatchAll() {
  notFound()
}
