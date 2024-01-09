// Page for event data for specific event

import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import { getEvent } from '@/lib/utils/db'
import { Badge } from '@/app/[lang]/components/ui/badge'
import Image from 'next/image'
import LocaleIcons from '@/app/[lang]/components/lang/LocaleIcon'

export default async function Page({
  params: { lang, eventSlug }
}: {
  params: { lang: Locale, eventSlug: string }
}) { 

  const event = await getEvent(eventSlug, lang)

  if (!event) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Event not found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <div className="mb-6">
          <Badge variant="secondary">
            <Image alt={event.language} src={LocaleIcons[event.language]} width={24} height={24} />
            <span className="text-sm pl-2">{event.language.toUpperCase()}</span>
          </Badge>
        </div>
        <p className="text-lg mb-2">{new Date(event.date).toLocaleDateString()}</p>
        {event.location && <p className="mb-4">Location: {event.location}</p>}
        <p className="text-sm mb-8">Required Registrations: {event.requiredRegistrations}</p>
        <div className="border-t border-gray-200 py-4">
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
}

