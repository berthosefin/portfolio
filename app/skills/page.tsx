import Skills from '@/components/skills'
import PromptLine from '@/components/tui/prompt-line'

export default function SkillsPage() {
  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <h1 className='sr-only'>Skills</h1>
        <Skills />
      </div>
    </section>
  )
}
