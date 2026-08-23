import Link from 'next/link'
import PromptLine from '@/components/tui/prompt-line'

export default function NotFound() {
  return (
    <section className='flex min-h-[60vh] items-center'>
      <div className='container max-w-3xl'>
        <PromptLine command='open /this-page-does-not-exist' showCaret>
          <p>
            <span className='text-destructive'>zsh:</span> no such file or
            directory: /this-page-does-not-exist
          </p>
          <p className='mt-1'>
            The page you are looking for was moved, removed, renamed — or never
            existed.
          </p>
          <p className='mt-6'>
            <Link
              href='/'
              className='text-brand underline-offset-4 hover:underline'
            >
              <span className='select-none text-emerald-600 dark:text-emerald-400'>
                $
              </span>{' '}
              cd ~/ → back home
            </Link>
          </p>
        </PromptLine>
      </div>
    </section>
  )
}
