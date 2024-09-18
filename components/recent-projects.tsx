import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import Projects from './projects'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='mb-4 text-2xl font-bold'>Recent projects</h2>
        <Projects projects={projects} />

        <Link
          href='/projects'
          className='mt-4 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>All projects</span>
        </Link>
      </div>
    </section>
  )
}
