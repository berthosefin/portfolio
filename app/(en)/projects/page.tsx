import ProjectsWithFilter from '@/components/projects-with-filter'
import PromptLine from '@/components/tui/prompt-line'
import { getDictionary } from '@/lib/i18n'
import { getProjects } from '@/lib/projects'
import { pageAlternates } from '@/lib/site'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary('en')
  return {
    title: dict.meta.projects.title,
    description: dict.meta.projects.description,
    alternates: pageAlternates('/projects')
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const dict = getDictionary('en')

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>{dict.projects.heading}</h1>
        <PromptLine command='ls -la ~/projects' className='mb-8' />
        <ProjectsWithFilter
          projects={projects}
          strings={{
            filterPlaceholder: dict.projects.filterPlaceholder,
            resetFilter: dict.projects.resetFilter,
            noMatches: dict.projects.noMatches
          }}
        />
      </div>
    </section>
  )
}
