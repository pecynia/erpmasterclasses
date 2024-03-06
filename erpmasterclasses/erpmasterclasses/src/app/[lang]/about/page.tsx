import React from 'react'
import AboutOverview from '@/app/[lang]/components/AboutOverview'
import AboutTopSection from '@/app/[lang]/components/AboutTopSection'
import { Locale } from '@../../../i18n.config'
import AboutFooter from '@/app/[lang]/components/AboutFooter'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"


export default function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const textIds = ['sticky-text-1', 'sticky-text-4', 'sticky-text-5']

  return (
    <div className='bg-white'>
      <AboutTopSection />

      <AboutOverview lang={lang} 
        aboutDescription={<EditorServer documentId={'about-description'} initialLocale={lang}/>}
        aboutOverview={textIds.map((id, index) => (
          <EditorServer key={index} documentId={id} initialLocale={lang} />
        ))}
      />

      <AboutFooter lang={lang} />
    </div>
  )
}

