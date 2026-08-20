import authorImage from '@/public/images/thos.jpg'
import { Dot } from 'lucide-react'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-6 pb-16 pt-6 md:flex-row md:items-center animate-fade-in-up'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
          Hey, I&apos;m{' '}
          <span className='bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent'>
            Thos
          </span>
          .
        </h1>
        <div className='mt-3 flex items-center gap-1.5 text-sm text-muted-foreground'>
          <span className='flex items-center gap-1'>
            <Dot className='h-5 w-5 text-emerald-400' strokeWidth={3} />
            <span>Fullstack Developer</span>
          </span>
        </div>
        <p className='mt-4 text-justify text-sm font-light leading-relaxed text-muted-foreground'>
          I&apos;m a self-taught developer, passionate about open source and Linux.
          I enjoy building things, tinkering with Linux, and ricing my setup.
        </p>
      </div>
      <div className='relative shrink-0'>
        <div className='rounded-full bg-gradient-to-br from-brand to-cyan-400 p-[2px]'>
          <div className='rounded-full bg-background p-1'>
            <Image
              className='rounded-full grayscale'
              src={authorImage}
              alt='Berthose Fin'
              width={150}
              height={150}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
