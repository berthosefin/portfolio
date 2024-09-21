import ProjectsWithFilter from '@/components/projects-with-filter'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <h1 className='mb-8 text-2xl font-bold'>Projects</h1>

        <ProjectsWithFilter projects={projects} />
      </div>
    </section>
  )
}
