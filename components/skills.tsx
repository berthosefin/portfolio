'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Code2,
  Monitor,
  Server,
  Database,
  Terminal,
  CheckCircle2,
  X
} from 'lucide-react'
import skillsData from '@/data/skills.json'

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 className='h-4 w-4' />,
  Frontend: <Monitor className='h-4 w-4' />,
  Backend: <Server className='h-4 w-4' />,
  Databases: <Database className='h-4 w-4' />,
  'DevOps & Tools': <Terminal className='h-4 w-4' />,
  'Testing & Quality Assurance': <CheckCircle2 className='h-4 w-4' />
}

export default function Skills() {
  const [categories, setCategories] = useState(skillsData.categories)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const filteredCategories = skillsData.categories
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(filter.toLowerCase())
        )
      }))
      .filter(category => category.skills.length > 0)

    setCategories(filteredCategories)
  }, [filter])

  const handleReset = () => {
    setFilter('')
    setCategories(skillsData.categories)
  }

  return (
    <section className='py-8'>
      <div className='mb-6 flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            type='text'
            placeholder='Search skills...'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className='pr-10'
          />
          {filter && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={handleReset}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Reset filter</span>
            </Button>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {categories.map(category => (
          <Card
            key={category.name}
            className='overflow-hidden border-border/50 transition-all duration-300 hover:border-brand/20 hover:shadow-md hover:shadow-brand/5'
          >
            <CardContent className='p-5'>
              <h3 className='mb-3 flex items-center gap-2 text-sm font-semibold text-brand'>
                {categoryIcons[category.name] || (
                  <Code2 className='h-4 w-4' />
                )}
                {category.name}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {category.skills.map(skill => (
                  <span
                    key={skill.name}
                    className='rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-brand/10 hover:text-brand'
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
