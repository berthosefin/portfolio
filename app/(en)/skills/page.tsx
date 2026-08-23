import Skills from '@/components/skills'
import { getDictionary } from '@/lib/i18n'
import { pageAlternates } from '@/lib/site'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary('en')
  return {
    title: dict.meta.skills.title,
    description: dict.meta.skills.description,
    alternates: pageAlternates('/skills')
  }
}

export default function SkillsPage() {
  const dict = getDictionary('en')

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>{dict.skills.heading}</h1>
        <Skills />
      </div>
    </section>
  )
}
