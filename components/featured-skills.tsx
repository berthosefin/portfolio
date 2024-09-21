import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import skillsData from '@/data/skills.json'
import { ArrowRightIcon } from 'lucide-react'

export default function FeaturedSkills() {
  const featuredSkills = skillsData.categories.flatMap(category =>
    category.skills.filter(skill => skill.featured)
  )

  return (
    <section className='py-12'>
      <h2 className='mb-6 text-2xl font-bold'>Key Skills</h2>
      <Card>
        <CardContent className='p-4'>
          <div className='flex flex-wrap gap-2'>
            {featuredSkills.map(skill => (
              <span
                key={skill.name}
                className='rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'
              >
                {skill.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className='mt-4 text-right'>
        <Link
          href='/skills'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline'
        >
          View all skills <ArrowRightIcon className='h-3 w-3' />
        </Link>
      </div>
    </section>
  )
}
