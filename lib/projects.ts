import type { Locale } from '@/lib/i18n'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const rootDirectory = path.join(process.cwd(), 'data', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  summaryFr?: string
  role?: string
  publishedAt?: string
  projectUrl?: string
  liveUrl?: string
  tags?: string[]
  slug: string
}

function localizedSummary(
  metadata: Omit<ProjectMetadata, 'slug'>,
  lang: Locale
): string | undefined {
  return lang === 'fr' && metadata.summaryFr ? metadata.summaryFr : metadata.summary
}

export async function getProjectBySlug(
  slug: string,
  lang: Locale = 'en'
): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return {
      metadata: { ...data, slug, summary: localizedSummary(data, lang) },
      content
    }
  } catch (error) {
    return null
  }
}

export async function getProjects(
  limit?: number,
  lang: Locale = 'en'
): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory).filter(file => file.endsWith('.mdx'))

  const projects = files
    .map(file => getProjectMetadata(file, lang))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}

export function getProjectMetadata(
  filepath: string,
  lang: Locale = 'en'
): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug, summary: localizedSummary(data, lang) }
}
