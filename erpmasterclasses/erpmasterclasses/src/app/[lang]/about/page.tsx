import React from 'react'
import AboutOverview from '@/app/[lang]/components/AboutOverview'
import AboutTopSection from '@/app/[lang]/components/AboutTopSection'
import { Locale } from '@../../../i18n.config'

export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div className='bg-white'>
      <AboutTopSection />
      <AboutOverview lang={lang} />
    </div>
  )
}

