import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <h1 className='mb-4 text-2xl font-bold'>Projects</h1>

        <Projects projects={projects} />
      </div>
    </section>
  )
}
