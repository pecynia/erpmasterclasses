import React from 'react'
import ContactForm from '@/app/[lang]/components/ContactForm'
import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'


export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 

  const { contact, errorMessages } = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center w-full py-20 relative'>
        <ContactForm localization={contact} errorMessages={errorMessages} />
    </div>
  )
}