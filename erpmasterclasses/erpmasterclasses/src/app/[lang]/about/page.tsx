import React from 'react'
import StickyScroll from '@/app/[lang]/components/StickyScroll'
import AboutTopSection from '@/app/[lang]/components/AboutTopSection'
import { Locale } from '@../../../i18n.config'

export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <div>
      <AboutTopSection />
      <StickyScroll lang={lang} />
    </div>
  )
}

