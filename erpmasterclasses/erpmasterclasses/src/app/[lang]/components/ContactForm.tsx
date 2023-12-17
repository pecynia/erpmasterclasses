'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ContactFormSchema } from '@/lib/schema'
import { sendEmail } from '@/app/_actions'
import { toast } from 'sonner'
import { Locale } from '../../../../i18n.config'


export type ContactFormInputs = z.infer<typeof ContactFormSchema>

export default async function ContactForm({ lang }: { lang: Locale }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema)
  })
  

  const processForm: SubmitHandler<ContactFormInputs> = async data => {
    const result = await sendEmail(data)

    if (result?.success) {
      toast.success('Email sent successfully!')
      reset()
      return
    }

    // toast error
    console.log(result?.error)
    toast.error('Oops, something went wrong. Please try again later.')
  }

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className='mx-auto flex flex-1 flex-col gap-4'
    >
      <h1 className='text-3xl text-center font-youngSerif py-2'>Reach Out</h1>
      {/* Name Input */}
      <input {...register('name')} placeholder='Name*' className='w-1/2 rounded-lg p-2' />
      {errors.name?.message && <p className='ml-1 -mt-2 text-sm text-red-400'>{errors.name.message}</p>}
      
      {/* Email Input */}
      <input {...register('email')} placeholder='Email*' className='w-1/2 rounded-lg p-2' />
      {errors.email?.message && <p className='ml-1 -mt-2 text-sm text-red-400'>{errors.email.message}</p>}

      {/* Phone Number Input */}
      <input {...register('phone')} placeholder='Phone number*' className='w-1/2 rounded-lg p-2' />
      {errors.phone?.message && <p className='ml-1 -mt-2 text-sm text-red-400'>{errors.phone.message}</p>}

      {/* Event Date Input */}
      <input {...register('eventDate')} placeholder='Date planned event (optional)' className='w-full rounded-lg p-2' />
      {/* No validation error for optional field */}
      
      {/* Company Name Input */}
      <input {...register('companyName')} placeholder='Company name (optional)' className='w-full rounded-lg p-2' />
      {/* No validation error for optional field */}
      
      {/* Message Input */}
      <textarea {...register('message')} rows={5} placeholder='Message*' className='w-full rounded-lg p-2' />
      {errors.message?.message && <p className='ml-1 -mt-2 text-sm text-red-400'>{errors.message.message}</p>}

      {/* Submit Button */}
      <button disabled={isSubmitting} className='rounded-lg border border-black bg-black py-2.5 font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50'>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}