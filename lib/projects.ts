import type { Locale } from '@/lib/i18n'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const rootDirectory = (lang: Locale) =>
  path.join(process.cwd(), 'data', 'projects', lang)

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  role?: string
  publishedAt?: string
  projectUrl?: string
  liveUrl?: string
  tags?: string[]
  slug: string
}

export async function getProjectBySlug(
  slug: string,
  lang: Locale = 'en'
): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory(lang), `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return { metadata: { ...data, slug }, content }
  } catch (error) {
    return null
  }
}

export async function getProjects(
  limit?: number,
  lang: Locale = 'en'
): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory(lang))

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
  const filePath = path.join(rootDirectory(lang), filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug }
}
