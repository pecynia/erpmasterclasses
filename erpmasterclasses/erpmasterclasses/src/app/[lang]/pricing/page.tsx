import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import PricingOverview from '../components/PricingOverview'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { navigation, pricing } = await getDictionary(lang)

  return (
    <div className='bg-background pb-10'>
      <div className='max-w-5xl mx-auto px-4 py-4 lg:py-20'>
        <div className='mx-auto w-full sm:w-2/3 md:w-full flex flex-col md:flex-row justify-center gap-10'>
          <PricingOverview lang={lang} navigation={navigation} pricing={pricing} />
        </div>
      </div>
    </div>
  )
}