'use server'

import { ContactFormSchema } from '@/lib/schemas'
import nodemailer from 'nodemailer'
import { z } from 'zod'

type ContactFormInputs = z.infer<typeof ContactFormSchema>

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div>
          <h1>Contact form submission</h1>
          <p>From <strong>${name}</strong> at ${email}</p>
          <h2>Message:</h2>
          <p>${message}</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    return { error }
  }
}