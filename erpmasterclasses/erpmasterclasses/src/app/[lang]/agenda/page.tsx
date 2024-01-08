import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import { getEvents } from '@/lib/utils/db'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 

  const events = await getEvents(lang)

  return (
    <div>
      {events.map(event => (
        <div key={event._id}>
          {event.title}
        </div>
      ))}
    </div>
  )
}