import Image from 'next/image'
import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { FileCode2 } from 'lucide-react'

const ProjectPlaceholder = () => (
  <div className='flex h-72 w-full items-center justify-center rounded-lg bg-muted sm:h-60'>
    <FileCode2 className='h-24 w-24 text-muted-foreground/50' />
  </div>
)

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <li key={project.slug} className='group'>
          <Link href={`/projects/${project.slug}`}>
            <div className='relative h-72 w-full overflow-hidden rounded-lg border border-border bg-muted transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-lg group-hover:shadow-brand/5 sm:h-60'>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title || ''}
                  fill
                  className='object-cover object-center transition-all duration-500 group-hover:scale-105'
                />
              ) : (
                <ProjectPlaceholder />
              )}

              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />

              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <h2 className='line-clamp-1 text-lg font-semibold text-white'>
                  {project.title}
                </h2>
                <p className='mt-0.5 line-clamp-1 text-xs text-white/70'>
                  {formatDate(project.publishedAt ?? '')}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className='rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm'
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className='rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/70 backdrop-blur-sm'>
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
