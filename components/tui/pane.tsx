import { cn } from '@/lib/utils'
import React from 'react'

export default function Pane({
  label,
  actions,
  className,
  contentClassName,
  children
}: {
  label?: string
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('border border-border bg-card', className)}>
      {label && (
        <div className='flex items-center justify-between gap-2 border-b border-border px-4 py-2'>
          <span className='truncate text-xs text-muted-foreground'>
            <span className='select-none text-brand'>── </span>
            {label}
            <span className='select-none text-brand'> ──</span>
          </span>
          {actions}
        </div>
      )}
      <div className={cn('p-4', !label && 'pt-0', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
