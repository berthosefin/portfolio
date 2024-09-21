import authorImage from '@/public/images/thos.jpg'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-16 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='text-2xl font-bold'>Hey, I&#39;m Thos.</h1>
        <p className='mt-4 text-justify text-sm font-light text-muted-foreground'>
          I&#39;m a self-taught fullstack developer from Madagascar, passionate
          about web development, open source, and Linux. My journey has been
          driven by curiosity and a love for learning, exploring modern
          technologies like React, Next.js, NestJS, and containerization, while
          personalizing my workflow through Linux.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={authorImage}
          alt='Berthose Fin'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
