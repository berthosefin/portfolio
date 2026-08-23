import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import Pane from '@/components/tui/pane'
import { formatDate } from '@/lib/utils'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <Pane label='~/projects' contentClassName='p-0'>
      <ul>
        {projects.map(project => {
          const isAuthor = project.role === 'Author'
          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className='group block px-4 py-4 transition-colors hover:bg-accent'
              >
                <div className='flex items-baseline justify-between gap-4'>
                  <h2 className='truncate text-sm font-semibold text-brand underline-offset-4 group-hover:underline'>
                    {isAuthor && <span aria-hidden='true'>~</span>}
                    {project.title}/
                  </h2>
                  <time
                    dateTime={project.publishedAt}
                    className='shrink-0 text-xs text-muted-foreground'
                  >
                    {formatDate(project.publishedAt ?? '')}
                  </time>
                </div>

                {project.summary && (
                  <p className='mt-1 line-clamp-1 text-xs leading-relaxed text-muted-foreground'>
                    {project.summary}
                  </p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <p className='mt-1 truncate text-xs text-muted-foreground'>
                    [{project.tags.join('] [')}]
                  </p>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </Pane>
  )
}
