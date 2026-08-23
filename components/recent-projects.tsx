import { localePrefix, type Locale } from '@/lib/i18n'
import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import Projects from './projects'
import PromptLine from '@/components/tui/prompt-line'

export default async function RecentProjects({
  lang = 'en'
}: {
  lang?: Locale
}) {
  const projects = await getProjects(2, lang)

  return (
    <section className='pb-24 pt-4'>
      <PromptLine command='ls -t ~/projects | head -2' className='mb-4' />
      <Projects projects={projects} />

      <div className='mt-3 text-right'>
        <Link
          href={`${localePrefix[lang]}/projects`}
          className='text-sm text-muted-foreground transition-colors hover:text-brand'
        >
          <span className='select-none text-emerald-600 dark:text-emerald-400'>
            $
          </span>{' '}
          cd /projects →
        </Link>
      </div>
    </section>
  )
}
