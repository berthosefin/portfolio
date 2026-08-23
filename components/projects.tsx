import Image from 'next/image'
import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { FileCode2 } from 'lucide-react'

const ProjectPlaceholder = () => (
  <div className='flex h-56 w-full items-center justify-center border-b border-border bg-muted'>
    <FileCode2 className='h-16 w-16 text-muted-foreground/40' />
  </div>
)

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      {projects.map(project => (
        <li key={project.slug} className='group'>
          <Link
            href={`/projects/${project.slug}`}
            className='block border border-border bg-card transition-colors hover:border-brand/50'
          >
            {project.image ? (
              <div className='relative h-52 w-full overflow-hidden border-b border-border sm:h-44'>
                <Image
                  src={project.image}
                  alt={project.title || ''}
                  fill
                  className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
                />
              </div>
            ) : (
              <ProjectPlaceholder />
            )}

            <div className='p-4'>
              <div className='flex items-baseline justify-between gap-3'>
                <h2 className='truncate text-sm font-semibold text-foreground'>
                  {project.title}
                </h2>
                <span className='shrink-0 text-xs text-muted-foreground'>
                  {formatDate(project.publishedAt ?? '')}
                </span>
              </div>

              {project.summary && (
                <p className='mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground'>
                  {project.summary}
                </p>
              )}

              {project.tags && project.tags.length > 0 && (
                <p className='mt-3 truncate text-xs text-brand'>
                  [{project.tags.join('] [')}]
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
