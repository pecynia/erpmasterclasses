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
    const { name, email, phone, eventDate, companyName, message } = result.data
    try {
      const emailData = await resend.emails.send({
        from: 'Willys2Go <contact@willys2go.nl>',
        to: ['willys2go@gmail.com'],
        subject: 'Contact form submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent Date: ${eventDate}\nCompany Name: ${companyName}\nMessage: ${message}`,
        react: ContactFormEmail({ name, email, phone, eventDate, companyName, message })
      })
      return { success: true, data: emailData }
    } catch (error) {
      return { success: false, error }
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}