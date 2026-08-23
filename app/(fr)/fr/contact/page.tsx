import ContactChannels from '@/components/contact-channels'
import { getDictionary } from '@/lib/i18n'
import { pageAlternates } from '@/lib/site'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary('fr')
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: pageAlternates('/contact')
  }
}

export default function ContactPageFr() {
  const dict = getDictionary('fr')

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>{dict.contact.heading}</h1>
        <ContactChannels lang='fr' />
      </div>
    </section>
  )
}
