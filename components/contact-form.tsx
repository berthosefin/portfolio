'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/actions'
import { ContactFormSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Inputs = z.infer<typeof ContactFormSchema>

const fieldLabel =
  'mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section>
      <div className='relative'>
        <form
          onSubmit={handleSubmit(processForm)}
          className='mt-8 first:mt-0 lg:flex-auto'
          noValidate
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Name */}
            <div>
              <label htmlFor='name' className={fieldLabel}>
                from (name)
              </label>
              <Input
                id='name'
                type='text'
                placeholder='Jane Doe'
                autoComplete='given-name'
                {...register('name')}
              />
              {errors.name?.message && (
                <p className='ml-1 mt-2 text-sm text-destructive'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className={fieldLabel}>
                reply-to (email)
              </label>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                placeholder='jane@example.com'
                {...register('email')}
              />
              {errors.email?.message && (
                <p className='ml-1 mt-2 text-sm text-destructive'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className='sm:col-span-2'>
              <label htmlFor='message' className={fieldLabel}>
                body (message)
              </label>
              <Textarea rows={5} placeholder='...' {...register('message')} />
              {errors.message?.message && (
                <p className='ml-1 mt-2 text-sm text-destructive'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-brand text-brand-foreground hover:bg-brand/90 disabled:opacity-50'
            >
              {isSubmitting ? 'sending...' : '[ send message ]'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
