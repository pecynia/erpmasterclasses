import { z } from 'zod'
import { Locale, i18n } from '@../../../i18n.config'
import { eventTypes, EventType } from '@../../../event.config'


// 1: Required
// 2: Invalid 
export const ContactFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().min(1, { message: '1' }).email('2'),
  message: z.string()
    .min(1, { message: '1.' })
    .min(6, { message: '2' })
})

export const AdditionalRegistrationFormSchema = z.object({
  nameParticipant: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().min(1, { message: '1' }).email('2')
})

export const RegistrationFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required.' }),
  address: z.string().min(1, { message: 'Adress is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  nameParticipant: z.string().min(1, { message: 'Name is required.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
  email: z.string().min(1, { message: '1' }).email('2'),
  position: z.string().min(1, { message: 'Position is required.' }),
  vatNumber: z.string().min(1, { message: 'VAT number is required.' }),
  poNumber: z.string().optional(),
  additionalParticipants: z.array(AdditionalRegistrationFormSchema).optional()
})

export const EventSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  eventSlug: z.string().min(1, { message: 'Slug is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  type: z.string().min(1, { message: 'Event type is required.' }).refine((value) => {
    return eventTypes.types.includes(value as EventType)
  }, { message: 'Event type is invalid.' }),
  date: z.date().refine((value) => {
    return value > new Date()
  }, { message: 'Date must be in the future.' }),
  location: z.string().optional(),
  requiredRegistrations: z.number().min(1, { message: 'At least one registration is required.' }),
  language: z.string().min(1, { message: 'Language is required.' }).refine((value) => {
    return i18n.locales.includes(value as Locale)
  }, { message: 'Language is invalid.' }),
  shownLanguages: z.array(z.string().min(1, { message: 'Language is required.' }).refine((value) => {
    return i18n.locales.includes(value as Locale)
  }, { message: 'Language is invalid.' })).min(1, { message: 'At least one language is required.' })
})

