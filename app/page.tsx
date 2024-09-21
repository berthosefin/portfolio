import FeaturedSkills from '@/components/featured-skills'
import Intro from '@/components/intro'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Intro />
        <FeaturedSkills />
        <RecentProjects />
      </div>
    </section>
  )
}
