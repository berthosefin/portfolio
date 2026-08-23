import GithubIcon from '@/components/github-icon'
import MDXContent from '@/components/mdx-content'
import { Globe } from 'lucide-react'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))
  return slugs
}

export default async function Project({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, role, publishedAt, projectUrl, liveUrl, tags } =
    metadata

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='inline-block text-sm text-muted-foreground transition-colors hover:text-brand'
        >
          <span className='select-none text-emerald-600 dark:text-emerald-400'>
            $
          </span>{' '}
          cd ../projects <ArrowLeftIcon className='inline h-3 w-3' />
        </Link>

        {image && (
          <div className='relative mt-6 h-80 w-full overflow-hidden border border-border sm:h-96'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header className='mt-8'>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
          <p className='mt-2 text-xs text-muted-foreground'>
            {role === 'Author' ? 'personal projects' : 'contributions'} ·{' '}
            {formatDate(publishedAt ?? '')}
          </p>

          {(projectUrl || liveUrl) && (
            <div className='mt-5 flex flex-wrap gap-3 text-sm'>
              {projectUrl && (
                <a
                  href={projectUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand'
                >
                  <GithubIcon className='h-4 w-4' />
                  [ source ]
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 bg-brand px-3 py-1.5 font-medium text-brand-foreground transition-opacity hover:opacity-90'
                >
                  <Globe className='h-4 w-4' />
                  [ live demo ]
                </a>
              )}
            </div>
          )}

          {tags && tags.length > 0 && (
            <p className='mt-4 text-xs leading-relaxed text-brand'>
              {`[${tags.join('] [')}]`}
            </p>
          )}
        </header>

        <main className='prose mt-10 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
