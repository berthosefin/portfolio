import Link from 'next/link'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import skillsData from '@/data/skills.json'
import { ArrowRightIcon } from 'lucide-react'

export default function FeaturedSkills() {
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
        <div className='mt-4 text-right'>
          <Link
            href='/skills'
            className='text-xs text-muted-foreground transition-colors hover:text-brand'
          >
            view all <ArrowRightIcon className='inline h-3 w-3' />
          </Link>
        </div>
      </Pane>
    </section>
  )
}
