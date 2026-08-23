import ProjectsWithFilter from '@/components/projects-with-filter'
import PromptLine from '@/components/tui/prompt-line'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>Projects</h1>
        <PromptLine command='ls -la ~/projects' className='mb-8' />
        <ProjectsWithFilter projects={projects} />
      </div>
    </section>
  )
}
