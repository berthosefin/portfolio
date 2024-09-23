'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectMetadata } from '@/lib/projects'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import Projects from './projects'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function ProjectsWithFilter({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title?.toLowerCase().includes(query.toLowerCase())
    )
  }, [projects, query])

  const categorizedProjects = useMemo(() => {
    return {
      all: filteredProjects,
      personal: filteredProjects.filter(project => project.role === 'Author'),
      contributions: filteredProjects.filter(
        project => project.role === 'Contributor'
      )
    }
  }, [filteredProjects])

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
            placeholder='Search projects...'
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

      <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='personal'>Personal</TabsTrigger>
          <TabsTrigger value='contributions'>Contribution</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <Projects projects={categorizedProjects.all} />
        </TabsContent>
        <TabsContent value='personal'>
          <Projects projects={categorizedProjects.personal} />
        </TabsContent>
        <TabsContent value='contributions'>
          <Projects projects={categorizedProjects.contributions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
