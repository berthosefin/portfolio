import { getProjects } from '@/lib/projects'
import Link from 'next/link'
import Projects from './projects'
import { ArrowRightIcon } from 'lucide-react'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='mb-6 text-2xl font-bold'>Recent projects</h2>
        <Projects projects={projects} />

        <div className='mt-4 text-right'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline'
          >
            View all projects <ArrowRightIcon className='h-3 w-3' />
          </Link>
        </div>
      </div>
    </section>
  )
}
