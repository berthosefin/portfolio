import { localePrefix, type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import skillsData from '@/data/skills.json'

export default function FeaturedSkills({ lang = 'en' }: { lang?: Locale }) {
  const featuredSkills = skillsData.categories.flatMap(category =>
    category.skills.filter(skill => skill.featured)
  )

  return (
    <section className='py-12'>
      <PromptLine command='grep -i "featured" ~/skills.json' className='mb-4' />
      <Pane label='~/skills --featured'>
        <div className='flex flex-wrap gap-2'>
          {featuredSkills.map(skill => (
            <span
              key={skill.name}
              className='border border-border px-2 py-1 text-xs text-secondary-foreground transition-colors hover:border-brand/50 hover:text-brand'
            >
              {skill.name}
            </span>
          ))}
        </div>
      </Pane>
        <div className='mt-3 text-right'>
          <Link
            href={`${localePrefix[lang]}/skills`}
            className='text-sm text-muted-foreground transition-colors hover:text-brand'
          >
            <span className='select-none text-emerald-600 dark:text-emerald-400'>
              $
            </span>{' '}
            cd /skills →
          </Link>
        </div>
    </section>
  )
}
