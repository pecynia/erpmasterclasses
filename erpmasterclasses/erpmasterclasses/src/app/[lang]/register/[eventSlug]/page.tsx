import React from 'react'
import ClientRegistrationForm from '@/app/[lang]/components/ClientRegistrationForm'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { getEvents } from '@/lib/utils/db'


export default async function Page({
  params: { lang, eventSlug }
}: {
  params: { lang: Locale, eventSlug: string }
}) { 

  const events = await getEvents(lang)
  const event = events.find(event => event.eventSlug === eventSlug)
  const { contact, errorMessages } = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center w-full py-10 relative'>
        <ClientRegistrationForm selectedEvent={event} events={events} lang={lang} localization={contact} errorMessages={errorMessages} />
    </div>
  )
}