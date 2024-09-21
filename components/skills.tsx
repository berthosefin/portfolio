'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button' // Assurez-vous d'avoir ce composant
import { X } from 'lucide-react' // Icône de croix pour le bouton reset
import skillsData from '@/data/skills.json'

export default function Skills() {
  const [categories, setCategories] = useState(skillsData.categories)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const filteredCategories = skillsData.categories
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(filter.toLowerCase())
        )
      }))
      .filter(category => category.skills.length > 0)

    setCategories(filteredCategories)
  }, [filter])

  const handleReset = () => {
    setFilter('')
    setCategories(skillsData.categories)
  }

  return (
    <section className='py-8'>
      <div className='mb-6 flex items-center gap-2'>
        <div className='relative flex-grow'>
          <Input
            type='text'
            placeholder='Search skills...'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className='pr-10' // Add padding for the reset button
          />
          {filter && (
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={handleReset}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Reset filter</span>
            </Button>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {categories.map(category => (
          <Card key={category.name}>
            <CardContent className='p-4'>
              <h3 className='mb-3 text-lg font-semibold'>{category.name}</h3>
              <div className='flex flex-wrap gap-2'>
                {category.skills.map(skill => (
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
        ))}
      </div>
    </section>
  )
}
