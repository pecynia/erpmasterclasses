import React from 'react'
import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import BenefitsTopSection from '@/app/[lang]/components/BenefitsTopSection'
import BenefitsOverview from '../components/BenefitsOverview'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { benefits } = await getDictionary(lang)


  return (
    <div className="">
      <BenefitsTopSection benefits={benefits} lang={lang} />
      <BenefitsOverview />
    </div>
  )
}