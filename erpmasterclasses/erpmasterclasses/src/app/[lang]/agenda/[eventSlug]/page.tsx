// Page for event data for specific event

import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Page({
  params: { lang, eventSlug }
}: {
  params: { lang: Locale, eventSlug: string }
}) { 
  const { contact, errorMessages } = await getDictionary(lang)

  return (
    <div>
      {eventSlug}
    </div>
  )
}