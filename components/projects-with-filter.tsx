'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectMetadata } from '@/lib/projects'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import Projects from './projects'

export default function ProjectsWithFilter({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  const [query, setQuery] = useState('')

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(
      project =>
        project.title?.toLowerCase().includes(q) ||
        project.summary?.toLowerCase().includes(q) ||
        project.tags?.some(tag => tag.toLowerCase().includes(q))
    )
  }, [projects, query])

  const isFiltered = query.length > 0
  function resetFilter() {
    setQuery('')
  }

  return (
    <div>
      <div className='mb-6 flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            type='text'
            placeholder='grep projects...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='pr-10' // Add padding for the reset button
          />
          {isFiltered && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={resetFilter}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Reset filter</span>
            </Button>
          )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <Projects projects={filteredProjects} />
      ) : (
        <p className='text-sm text-muted-foreground'>
          grep: no matches found
        </p>
      )}
    </div>
  )
}
