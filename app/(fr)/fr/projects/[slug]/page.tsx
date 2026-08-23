import ProjectDetail from '@/components/project-detail'
import { getProjects, getProjectBySlug } from '@/lib/projects'
import { pageAlternates } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const projects = await getProjects(undefined, 'fr')
  const slugs = projects.map(project => ({ slug: project.slug }))
  return slugs
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const project = await getProjectBySlug(slug, 'fr')

  if (!project) {
    return {
      title: getDictionary('fr').meta.notFound.title,
      description: getDictionary('fr').meta.notFound.description
    }
  }

  return {
    title: project.metadata.title,
    description: project.metadata.summary,
    alternates: pageAlternates(`/projects/${slug}`)
  }
}

export default async function ProjectFr({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  return <ProjectDetail slug={slug} lang='fr' />
}
