import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import { getDictionary } from '@/lib/dictionary';

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 
  const { contact, errorMessages } = await getDictionary(lang);

  return (
    <div>
      
    </div>
  )
}