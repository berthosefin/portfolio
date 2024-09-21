import ContactForm from '@/components/contact-form'

export default function ContactPage() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <h2 className='text-2xl font-bold'>
          Let&apos;s talk about your project
        </h2>

        <ContactForm />
      </div>
    </section>
  )
}
