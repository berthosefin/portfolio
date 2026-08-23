import ContactForm from '@/components/contact-form'
import Pane from '@/components/tui/pane'
import PromptLine from '@/components/tui/prompt-line'

export default function ContactPage() {
  return (
    <section className='pb-24 pt-28'>
      <div className='container max-w-4xl'>
        <PromptLine command='mail -s "project inquiry" thos' className='mb-8' />
        <Pane label='~/contact --compose'>
          <ContactForm />
        </Pane>
      </div>
    </section>
  )
}
