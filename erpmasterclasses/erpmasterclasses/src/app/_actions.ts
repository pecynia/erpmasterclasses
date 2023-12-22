'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schema'
import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.success) {
    const { companyName, name, email, message } = result.data
    try {
      const emailData = await resend.emails.send({
        from: 'ERP Masterclass <contact@erpmasterclasses.com>',
        to: ['gk@dynamicsandmore.com'],
        subject: 'Contact form submission',
        text: `Company Name: ${companyName}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormEmail({ companyName, name, email, message }),
      })
      return { success: true, data: emailData }
    } catch (error) {
      return { success: false, error }
    }
  }

  return { success: false, error: result.error.format() }
}
