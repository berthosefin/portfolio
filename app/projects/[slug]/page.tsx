import GithubIcon from '@/components/github-icon'
import MDXContent from '@/components/mdx-content'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon, ExternalLink } from 'lucide-react'
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
  const { title, image, role, publishedAt, projectUrl, liveUrl } = metadata

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:underline'
        >
          <ArrowLeftIcon className='h-3 w-3' />
          <span>Back to all projects</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header>
          <div className='inline-flex items-center space-x-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            {projectUrl && (
              <a
                href={projectUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground'
              >
                <GithubIcon className='h-4 w-4' />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-foreground'
              >
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
          </div>
          <p className='mt-3 text-xs text-muted-foreground'>
            {role === 'Author' ? 'Personal Projects' : 'Project Contributions'}{' '}
            / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 text-justify dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
