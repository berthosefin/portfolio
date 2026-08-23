'use client'

import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import skillsData from '@/data/skills.json'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'

type Branch = {
  dir: string
  leaves: { name: string; featured: boolean }[]
}

const toDirName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const allBranches: Branch[] = skillsData.categories.map(category => ({
  dir: toDirName(category.name),
  leaves: category.skills.map(skill => ({
    name: skill.name,
    featured: skill.featured
  }))
}))

type Row = {
  key: string
  connector: string
  kind: 'dir' | 'leaf'
  name: string
  brand: boolean
  featured?: boolean
}

export default function Skills() {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()

  const branches = useMemo(() => {
    if (!q) return allBranches
    return allBranches
      .map(branch => ({
        ...branch,
        leaves: branch.leaves.filter(leaf =>
          leaf.name.toLowerCase().includes(q)
        )
      }))
      .filter(branch => branch.leaves.length > 0)
  }, [q])

  const totalSkills = branches.reduce((acc, b) => acc + b.leaves.length, 0)
  const isFiltered = query.length > 0

  const rows: Row[] = []
  branches.forEach((branch, bi) => {
    const isLastBranch = bi === branches.length - 1
    const childPipe = isLastBranch ? '    ' : '│   '
    const brand = branch.dir === 'business-domain'
    rows.push({
      key: `dir-${branch.dir}`,
      connector: isLastBranch ? '└── ' : '├── ',
      kind: 'dir',
      name: `${branch.dir}/`,
      brand
    })
    branch.leaves.forEach((leaf, li) => {
      rows.push({
        key: `leaf-${bi}-${li}`,
        connector: `${childPipe}${li === branch.leaves.length - 1 ? '└── ' : '├── '}`,
        kind: 'leaf',
        name: leaf.featured ? leaf.name : `${leaf.name} *`,
        brand,
        featured: leaf.featured
      })
    })
  })

  return (
    <div>
      <PromptLine
        command={
          q ? `tree ~/skills -P "*${query.trim()}*"` : 'tree ~/skills'
        }
        className='mb-6'
      />

      <div className='mb-6 flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            type='text'
            placeholder='filter skills...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='pr-10'
          />
          {isFiltered && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={() => setQuery('')}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Reset filter</span>
            </Button>
          )}
        </div>
      </div>

      <Pane label='~/skills' contentClassName='overflow-x-auto p-4'>
        <div className='whitespace-nowrap text-sm leading-[1.8]'>
          <p className='font-medium text-foreground'>~/skills</p>

          {rows.map(row => (
            <p key={row.key}>
              <span
                className={`select-none ${
                  row.brand ? 'text-brand/40' : 'text-muted-foreground'
                }`}
              >
                {row.connector}
              </span>
              <span
                className={
                  row.kind === 'dir'
                    ? row.brand
                      ? 'font-medium text-brand'
                      : 'font-medium text-foreground'
                    : row.featured
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                }
              >
                {row.name}
              </span>
            </p>
          ))}

          <p className='mt-3 text-muted-foreground'>
            {branches.length} director{branches.length === 1 ? 'y' : 'ies'},{' '}
            {totalSkills} skill{totalSkills === 1 ? '' : 's'}
          </p>
        </div>
      </Pane>

      <p className='mt-4 text-xs text-muted-foreground'>
        * supporting tools — everything else ships in real projects.
      </p>
    </div>
  )
}
