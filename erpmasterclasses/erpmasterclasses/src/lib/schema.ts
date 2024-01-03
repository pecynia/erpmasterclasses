import { z } from 'zod'


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

export const RegristrationFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required.' }),
  adress: z.string().min(1, { message: 'Adress is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
  nameParticipant: z.string().min(1, { message: 'Name is required.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
  email: z.string().min(1, { message: '1' }).email('I2'),
  position: z.string().min(1, { message: 'Position is required.' }),
  vatNumber: z.string().min(1, { message: 'VAT number is required.' }),
  poNumber: z.string().optional()
})

export const AdditionalRegristrationFormSchema = z.object({
  nameParticipant: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().min(1, { message: '1' }).email('2')
})