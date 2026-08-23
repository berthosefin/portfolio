'use client'

import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import skillsData from '@/data/skills.json'
import { cn } from '@/lib/utils'
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
  dir?: string
  hiddenCount?: number
}

export default function Skills() {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

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

  const toggleBranch = (dir: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(dir)) {
        next.delete(dir)
      } else {
        next.add(dir)
      }
      return next
    })
  }

  const rows: Row[] = []
  let visibleSkills = 0
  branches.forEach((branch, bi) => {
    const isLastBranch = bi === branches.length - 1
    const childPipe = isLastBranch ? '    ' : '│   '
    const brand = branch.dir === 'business-domain'
    const isCollapsed = !q && collapsed.has(branch.dir)
    rows.push({
      key: `dir-${branch.dir}`,
      connector: isLastBranch ? '└── ' : '├── ',
      kind: 'dir',
      name: `${branch.dir}/`,
      brand,
      dir: branch.dir,
      hiddenCount: isCollapsed ? branch.leaves.length : undefined
    })
    if (isCollapsed) return
    branch.leaves.forEach((leaf, li) => {
      visibleSkills++
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

  const visibleBranches = branches.length
  const isFiltered = query.length > 0

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
        <div className='whitespace-pre text-sm leading-[1.8]'>
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
              {row.kind === 'dir' ? (
                <button
                  type='button'
                  onClick={() => row.dir && toggleBranch(row.dir)}
                  aria-expanded={row.hiddenCount === undefined}
                  className={cn(
                    'cursor-pointer font-medium transition-colors',
                    row.brand
                      ? 'text-brand hover:text-brand/70'
                      : 'text-foreground hover:text-brand'
                  )}
                >
                  {row.name}
                  {row.hiddenCount !== undefined && (
                    <span className='font-normal text-muted-foreground'>
                      {' '}({row.hiddenCount})
                    </span>
                  )}
                </button>
              ) : (
                <span
                  className={
                    row.featured ? 'text-foreground' : 'text-muted-foreground'
                  }
                >
                  {row.name}
                </span>
              )}
            </p>
          ))}

          <p className='mt-3 text-muted-foreground'>
            {visibleBranches} director{visibleBranches === 1 ? 'y' : 'ies'},{' '}
            {visibleSkills} skill{visibleSkills === 1 ? '' : 's'}
          </p>
        </div>
      </Pane>

      <p className='mt-4 text-xs text-muted-foreground'>
        * supporting tools — everything else ships in real projects.
      </p>
    </div>
  )
}
