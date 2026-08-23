import Link from 'next/link'
import PromptLine from '@/components/tui/prompt-line'

type NotFoundPageProps = {
  errorLine: string
  message: string
  ctaHref: string
  ctaLabel: string
}

export default function NotFoundPage({
  errorLine,
  message,
  ctaHref,
  ctaLabel,
}: NotFoundPageProps) {
  return (
    <section className='flex min-h-[60vh] items-center'>
      <div className='container max-w-3xl'>
        <PromptLine command='open /this-page-does-not-exist' showCaret>
          <p>
            <span className='text-destructive'>zsh:</span> {errorLine}
          </p>
          <p className='mt-1'>{message}</p>
          <p className='mt-6'>
            <Link
              href={ctaHref}
              className='text-brand underline-offset-4 hover:underline'
            >
              <span className='select-none text-emerald-600 dark:text-emerald-400'>
                $
              </span>{' '}
              {ctaLabel}
            </Link>
          </p>
        </PromptLine>
      </div>
    </section>
  )
}
