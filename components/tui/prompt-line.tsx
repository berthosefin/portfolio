import { cn } from '@/lib/utils'
import React from 'react'

export default function PromptLine({
  command,
  showCaret = false,
  className,
  outputClassName,
  children
}: {
  command: string
  showCaret?: boolean
  className?: string
  outputClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('font-mono text-sm leading-relaxed', className)}>
      <p className='break-all'>
        <span className='select-none font-semibold text-emerald-600 dark:text-emerald-400'>
          thos@portfolio
        </span>
        <span className='select-none text-muted-foreground'>:~$ </span>
        <span className='text-foreground'>{command}</span>
        {showCaret && (
          <span
            aria-hidden='true'
            className='animate-caret-blink ml-0.5 select-none inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-brand'
          />
        )}
      </p>
      {children && (
        <div className={cn('mt-3 text-muted-foreground', outputClassName)}>
          {children}
        </div>
      )}
    </div>
  )
}
