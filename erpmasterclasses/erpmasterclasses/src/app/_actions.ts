'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schema'
import ContactFormEmail from '@/emails/contact-form-email'
import RegistrationFormEmail from '@/emails/registration-form-email'
import CheckoutExpiredEmail from '@/emails/checkout-expired-email'
import { addEvent, getEventsWithRegistrations, getEvents, deleteEvent, updateEvent, getParagraphJson, deleteRegistration } from '@/lib/utils/db'
import { CreateEventProps, EventData, EventProps, RegistrationFormProps } from '@/../typings'
import { Locale } from '@../../../i18n.config'
import RegistrationConfirmationEmail from '@/emails/registration-confirmation-email'

// ------------------ CONTACT FORMS ------------------


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
        to: ['gk@erpmasterclasses.com'],
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
export async function sendRegistrationEmail(data: RegistrationFormProps, event: EventProps,  pdfBufferRaw: Buffer) {
  const pdfBuffer = Buffer.from(pdfBufferRaw)
  try {
    const emailData = await resend.emails.send({
      from: 'ERP Masterclass <registrations@erpmasterclasses.com>',
      to: ['gk@erpmasterclasses.com'],
      subject: 'Registration form submission',
      text: `Event: ${event.title}\nCompany Name: ${data.companyName}\nAdress: ${data.address}\nCountry: ${data.country}\nName: ${data.nameParticipant}\nPhone: ${data.phone}\nEmail: ${data.email}\nPosition: ${data.position}\nVAT number: ${data.vatNumber}\nPO number: ${data.poNumber}\nAdditional participants: ${data.additionalParticipants}`,
      react: RegistrationFormEmail({ ...data }),
      attachments: [{ filename: 'invoice.pdf', content: pdfBuffer }]
    })
    return { success: true, data: emailData }
  }
  catch (error) {
    return { success: false, error }
  }
}

// Checkout expired email
export async function sendCheckoutExpiredEmail(data: RegistrationFormProps) {
  try {
    const emailData = await resend.emails.send({
      from: 'ERP Masterclass <actions@erpmasterclasses.com>',
      to: ['gk@erpmasterclasses.com'],
      subject: 'Checkout Expired',
      text: `Event: ${data.selectedEvent.title}\nCompany Name: ${data.companyName}\nAdress: ${data.address}\nCountry: ${data.country}\nName: ${data.nameParticipant}\nPhone: ${data.phone}\nEmail: ${data.email}\nPosition: ${data.position}\nVAT number: ${data.vatNumber}\nPO number: ${data.poNumber}\nAdditional participants: ${data.additionalParticipants}`,
      react: CheckoutExpiredEmail({ ...data }),
    })
    return { success: true, data: emailData }
  }
  catch (error) {
    return { success: false, error }
  }
}

export type PaymentDetails = {
  subtotal: number,
  totalAmount: number,
  discount: number,
  tax: number,
  customer_details: {
    address: {
      city: string,
      country: string,
      line1: string,
      line2?: string,
      postal_code: string,
      state?: string
    },
    email: string,
    name?: string,
    phone?: string
  }
}

// Resend registration email
export async function sendRegistrationConfirmationEmail(data: RegistrationFormProps, paymentDetails: PaymentDetails, pdfBufferRaw: Buffer) {
  const pdfBuffer = Buffer.from(pdfBufferRaw)
  try {
    const { totalAmount, subtotal, tax, discount } = paymentDetails
    const emailData = await resend.emails.send({
      from: 'ERP Masterclass <contact@erpmasterclasses.com>',
      to: data.email,
      subject: 'Your Registration Confirmation',
      text: `Event: ${data.selectedEvent.title}\nCompany Name: ${data.companyName}\nAdress: ${data.address}\nCountry: ${data.country}\nName: ${data.nameParticipant}\nPhone: ${data.phone}\nEmail: ${data.email}\nPosition: ${data.position}\nVAT number: ${data.vatNumber}\nPO number: ${data.poNumber}\nAdditional participants: ${data.additionalParticipants}`,
      react: RegistrationConfirmationEmail({ ...data, totalAmount, subtotal, tax, discount }),
      attachments: [{ filename: 'invoice.pdf', content: pdfBuffer }]
    })
    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return { success: false, error }
  }
}


// ------------------ REGISTRATIONS ------------------

export async function removeRegistration(eventId: string, registrationId: string) {
  const result = await deleteRegistration(eventId, registrationId)
  if (result.acknowledged) {
    return { success: true, data: result }
  }
}



// ------------------ EVENTS ------------------

// Save event to database
export async function saveEvent(data: CreateEventProps) {
  const { result, _id, eventWithStripe } = await addEvent(data)
  if (result.success) {
    return { success: true, data: result.data, _id, eventWithStripe }
  } else {
    return { success: false, error: result.error }
  }
}

// Get all events (EventData[]) with registrations (ADMIN)
export async function getAllEventsAdmin(): Promise<EventData[]> {
  return await getEventsWithRegistrations()
}

// Get all events (EventProps[]) based on language is in shownLanguages
export async function getAllEvents(language: Locale): Promise<EventProps[]> {
  return await getEvents(language)
}

// Remove event from database
export async function removeEvent(id: string) {
  const result = await deleteEvent(id)
  if (result.acknowledged) {
    return { success: true, data: result }
  }
}

// Update event in database
export async function updateEventInDatabase(data: EventData) {
  const { result, stripePriceId } = await updateEvent(data)
  if (result.acknowledged) {
    return { success: true, data: result, stripePriceId }
  } else
    return { success: false, error: 'Error updating event' }
}


// ------------------ CONTENT ACTIONS ------------------

// Server action
export async function getParagraph(id: string, locale: Locale) {
  try {
    const result = await getParagraphJson(id, locale)
    if (result) {
      return { success: true, data: result }
    } else {
      return { success: false, error: "No data found" }
    }
  } catch (error) {
    console.error("Error in getParagraph:", error)
    return { success: false, error: "Server error" }
  }
}

