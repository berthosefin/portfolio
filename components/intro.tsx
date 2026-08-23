import authorImage from '@/public/images/thos.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse gap-x-10 gap-y-6 pb-16 pt-6 md:flex-row md:items-start animate-fade-in-up'>
      <div className='flex-1'>
        <PromptLine command='whoami' />
        <h1 className='mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
          Berthose Fin{' '}
          <span className='font-normal text-muted-foreground'>(Thos)</span>
          <span className='ml-2 align-middle text-xs font-normal text-muted-foreground'>
            — self-taught developer
          </span>
        </h1>

        <div className='mt-8'>
          <PromptLine command='cat about.txt'>
            <p>
              Self-taught developer. Linux enthusiast. Open source builder.
            </p>
            <p className='mt-3'>
              I live in the terminal — ricing Hyprland, scripting Bash, and shipping Rust crates.
            </p>
            <p className='mt-3'>
              My accounting and payroll background helps me build software that understands the business behind the code.
            </p>
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
                <span>hyprland config, matugen theming</span>
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
                <span>Rust CLI, published on crates.io</span>
              </li>
            </ul>
          </PromptLine>
        </div>

        <div className='mt-8 hidden md:block'>
          <PromptLine command='_'>
            <span className='sr-only'>Ready for input</span>
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
