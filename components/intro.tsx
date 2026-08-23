import authorImage from '@/public/images/thos.jpg'
import { getDictionary, type Locale } from '@/lib/i18n'
import Image from 'next/image'
import Link from 'next/link'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'

export default function Intro({ lang = 'en' }: { lang?: Locale }) {
  const dict = getDictionary(lang)

  return (
    <section className='flex flex-col-reverse gap-x-10 gap-y-6 pb-16 pt-6 md:flex-row md:items-start animate-fade-in-up'>
      <div className='flex-1'>
        <PromptLine command='whoami' />
        <h1 className='mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
          Berthose Fin{' '}
          <span className='font-normal text-muted-foreground'>(Thos)</span>
          <span className='ml-2 align-middle text-xs font-normal text-muted-foreground'>
            {dict.home.role}
          </span>
        </h1>

        <div className='mt-8'>
          <PromptLine command='cat about.txt'>
            <p>{dict.home.about[0]}</p>
            <p className='mt-3'>{dict.home.about[1]}</p>
            <p className='mt-3'>{dict.home.about[2]}</p>
          </PromptLine>
        </div>

        <div className='mt-8'>
          <PromptLine command='ls ~/open-source'>
            <ul className='flex flex-wrap gap-x-6 gap-y-1'>
              <li>
                <Link
                  href='https://github.com/berthosefin/dots'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-brand underline-offset-4 hover:underline'
                >
                  dots/
                </Link>{' '}
                <span>{dict.home.openSource.dots}</span>
              </li>
              <li>
                <Link
                  href='https://github.com/berthosefin/randanarana'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-brand underline-offset-4 hover:underline'
                >
                  randanarana/
                </Link>{' '}
                <span>{dict.home.openSource.randanarana}</span>
              </li>
            </ul>
          </PromptLine>
        </div>

        <div className='mt-8 hidden md:block'>
          <PromptLine command='_'>
            <span className='sr-only'>{dict.home.readyForInput}</span>
          </PromptLine>
        </div>
      </div>

      <Pane
        label='viewer: thos.jpg'
        className='mx-auto w-fit shrink-0 self-center md:self-start'
        contentClassName='p-2'
      >
        <Image
          className='grayscale'
          src={authorImage}
          alt='Berthose Fin'
          width={150}
          height={150}
          priority
        />
      </Pane>
    </section>
  )
}
