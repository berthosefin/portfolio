import FeaturedSkills from '@/components/featured-skills'
import Intro from '@/components/intro'
import RecentProjects from '@/components/recent-projects'
import { getDictionary } from '@/lib/i18n'
import { pageAlternates } from '@/lib/site'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary('en')
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: pageAlternates('/')
  }
}

export default function Home() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-4xl'>
        <Intro lang='en' />
        <FeaturedSkills lang='en' />
        <RecentProjects lang='en' />
      </div>
    </section>
  )
}
