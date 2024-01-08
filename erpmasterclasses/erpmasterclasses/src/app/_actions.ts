'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, RegristrationFormSchema } from '@/lib/schema'
import ContactFormEmail from '@/emails/contact-form-email'
import RegistrationFormEmail from '@/emails/registration-form-email'
import { addEvent } from '@/lib/utils/db'
import { CreateEventProps } from '@/../typings'

const resend = new Resend(process.env.RESEND_API_KEY)

// Contact Form
type ContactFormInputs = z.infer<typeof ContactFormSchema>
export async function sendContactEmail(data: ContactFormInputs) {
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


// Registration Form 
type RegistrationFormInputs = z.infer<typeof RegristrationFormSchema>
export async function sendRegistrationEmail(data: RegistrationFormInputs) {
  const result = RegristrationFormSchema.safeParse(data)

  if (result.success) {
    const { companyName, address, country, nameParticipant, phone, email, position, vatNumber, poNumber, additionalParticipants } = result.data
    const _id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    try {
      const emailData = await resend.emails.send({
        from: 'ERP Masterclass <contact@erpmasterclasses.com>',
        to: ['verheul.nicolai@gmail.com'], //['gk@dynamicsandmore.com'],
        subject: 'Registration form submission',
        text: `Company Name: ${companyName}\nAdress: ${address}\nCountry: ${country}\nName: ${nameParticipant}\nPhone: ${phone}\nEmail: ${email}\nPosition: ${position}\nVAT number: ${vatNumber}\nPO number: ${poNumber}\nAdditional participants: ${additionalParticipants}`,
        react: RegistrationFormEmail({ _id, companyName, address, country, nameParticipant, phone, email, position, vatNumber, poNumber, additionalParticipants }),
      })
      return { success: true, data: emailData }
    }
    catch (error) {
      return { success: false, error }
    }
  }

  return { success: false, error: result.error.format() }
}


// Save event to database
export async function saveEvent(data: CreateEventProps) {
  const result = await addEvent(data)
  return result
}






