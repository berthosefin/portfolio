'use client'

import React, { useState, useEffect } from 'react'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Code2,
  Monitor,
  Server,
  Database,
  Terminal,
  Briefcase,
  X
} from 'lucide-react'
import skillsData from '@/data/skills.json'

const categoryIcons: Record<string, React.ReactNode> = {
  'Business Domain': <Briefcase className='h-3.5 w-3.5' />,
  'Programming Languages': <Code2 className='h-3.5 w-3.5' />,
  Frontend: <Monitor className='h-3.5 w-3.5' />,
  Backend: <Server className='h-3.5 w-3.5' />,
  Databases: <Database className='h-3.5 w-3.5' />,
  'DevOps & Tools': <Terminal className='h-3.5 w-3.5' />
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
      <PromptLine command='tree ~/skills' className='mb-4' />

      <div className='mb-6 flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            type='text'
            placeholder='grep skills...'
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
        {categories.map(category => {
          const isBusiness = category.name === 'Business Domain'
          return (
            <Pane
              key={category.name}
              label={category.name.toLowerCase()}
              className={
                isBusiness ? 'border-brand/40 bg-brand/[0.04]' : undefined
              }
            >
              <div className={'flex flex-wrap gap-2'}>
                {category.skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`border px-2 py-1 text-xs transition-colors ${
                      skill.featured
                        ? isBusiness
                          ? 'border-brand/50 bg-brand/10 text-brand'
                          : 'border-border text-foreground hover:border-brand/50 hover:text-brand'
                        : 'border-border/60 text-muted-foreground'
                    }`}
                  >
                    {skill.name}
                    {!skill.featured && <span className='opacity-60'> *</span>}
                  </span>
                ))}
              </div>
            </Pane>
          )
        })}
      </div>

      <p className='mt-6 text-xs text-muted-foreground'>
        * supporting tools — everything else ships in real projects.
      </p>
    </section>
  )
}
