import ContactForm from '@/components/contact-form'

export default function ContactPage() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <h1 className='mb-2 text-3xl font-bold tracking-tight'>
          Let&apos;s talk about your project
        </h1>
        <p className='mb-8 text-sm text-muted-foreground'>
          Have a project in mind? Reach out and let&apos;s discuss it.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
