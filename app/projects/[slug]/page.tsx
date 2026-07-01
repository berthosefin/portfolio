import GithubIcon from '@/components/github-icon'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon, ExternalLink, Globe } from 'lucide-react'
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
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand'
        >
          <ArrowLeftIcon className='h-3 w-3' />
          <span>Back to all projects</span>
        </Link>

        {image && (
          <div className='relative mb-8 h-96 w-full overflow-hidden rounded-xl border border-border shadow-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
              <p className='mt-2 text-sm text-muted-foreground'>
                {role === 'Author' ? 'Personal Projects' : 'Project Contributions'}{' '}
                / {formatDate(publishedAt ?? '')}
              </p>
            </div>
            <div className='flex shrink-0 gap-2'>
              {projectUrl && (
                <a
                  href={projectUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-brand/30 hover:text-brand'
                >
                  <GithubIcon className='h-4 w-4' />
                  <span className='hidden sm:inline'>Source</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-white transition-all hover:bg-brand/90'
                >
                  <Globe className='h-4 w-4' />
                  <span className='hidden sm:inline'>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map(tag => (
                <span
                  key={tag}
                  className='rounded-md bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <main className='prose mt-12 text-justify dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
