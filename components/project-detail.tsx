import GithubIcon from '@/components/github-icon'
import MDXContent from '@/components/mdx-content'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'
import { getDictionary, localePrefix, type Locale } from '@/lib/i18n'
import { getProjectBySlug } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProjectDetail({
  slug,
  lang = 'en'
}: {
  slug: string
  lang?: Locale
}) {
  const dict = getDictionary(lang)
  const prefix = localePrefix[lang]
  const project = await getProjectBySlug(slug, lang)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, role, publishedAt, projectUrl, liveUrl, tags } = metadata

  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-3xl'>
        <Link
          href={`${prefix}/projects`}
          className='inline-block text-sm text-muted-foreground transition-colors hover:text-brand'
        >
          <span className='select-none text-emerald-600 dark:text-emerald-400'>
            $
          </span>{' '}
          cd ../projects <ArrowLeftIcon className='inline h-3 w-3' />
        </Link>

        <div className='mt-6'>
          <PromptLine command={`cd ~/projects/${slug} && cat README.md`} />
        </div>

        <Pane label={title} className='mt-4'>
          <p className='text-xs uppercase tracking-wider text-muted-foreground'>
            {role === 'Author'
              ? dict.projects.personalProject
              : dict.projects.contributions}{' '}
            · {formatDate(publishedAt ?? '')}
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
        </Pane>

        <main className='prose mt-10 dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
