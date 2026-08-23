'use client'

import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import skillsData from '@/data/skills.json'
import { getDictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { slugify } from '@/lib/slugify'

type Branch = {
  dir: string
  leaves: { name: string; featured: boolean }[]
  brand: boolean
}

const allBranches: Record<Locale, Branch[]> = {
  en: [],
  fr: []
}

for (const category of skillsData.categories) {
  for (const lang of ['en', 'fr'] as Locale[]) {
    const isFr = lang === 'fr'
    const categoryName = isFr ? (category.nameFr ?? category.name) : category.name
    const isBrandCategory = category.name === 'Business Domain'
    allBranches[lang].push({
      dir: slugify(categoryName),
      leaves: category.skills.map(skill => ({
        name:
          isFr && isBrandCategory && 'nameFr' in skill
            ? (skill.nameFr ?? skill.name)
            : skill.name,
        featured: skill.featured
      })),
      brand: isBrandCategory
    })
  }
}

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

export default function Skills({ lang = 'en' }: { lang?: Locale }) {
  const dict = getDictionary(lang)
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const q = query.trim().toLowerCase()

  const branches = useMemo(() => {
    if (!q) return allBranches[lang]
    return allBranches[lang]
      .map(branch => ({
        ...branch,
        leaves: branch.leaves.filter(leaf =>
          leaf.name.toLowerCase().includes(q)
        )
      }))
      .filter(branch => branch.leaves.length > 0)
  }, [q, lang])

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
    const brand = branch.brand
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
            placeholder={dict.skills.filterPlaceholder}
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
              <span className='sr-only'>{dict.skills.resetFilter}</span>
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
            {visibleBranchsLabel(visibleBranches, dict)},{' '}
            {visibleSkillsLabel(visibleSkills, dict)}
          </p>
        </div>
      </Pane>

      <p className='mt-4 text-xs text-muted-foreground'>{dict.skills.footnote}</p>
    </div>
  )
}

function visibleBranchsLabel(count: number, dict: ReturnType<typeof getDictionary>) {
  const word =
    count === 1
      ? dict.skills.summary.directoryOne
      : dict.skills.summary.directoryMany
  return `${count} ${word}`
}

function visibleSkillsLabel(count: number, dict: ReturnType<typeof getDictionary>) {
  const word =
    count === 1 ? dict.skills.summary.skillOne : dict.skills.summary.skillMany
  return `${count} ${word}`
}
