import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import BenefitsTopSection from '@/app/[lang]/components/BenefitsTopSection'
import BenefitsOverview from '@/app/[lang]/components/BenefitsOverview'
import BenefitsFooter from '@/app/[lang]/components/BenefitsFooter'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"


export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { benefits } = await getDictionary(lang)

  const documentIds = [
    'benefits-description-1',
    'benefits-description-2',
    'benefits-description-3',
    'benefits-description-4',
    'benefits-description-5'
  ]

  return (
    <>
      <BenefitsTopSection benefits={benefits} lang={lang}>
        <EditorServer documentId='benefits-description-list' initialLocale={lang} />
      </BenefitsTopSection>

      <BenefitsOverview 
        benefitsDescription={<EditorServer documentId='benefits-description' initialLocale={lang} />}
        overviewList={documentIds.map((documentId) => (
        <EditorServer key={documentId} documentId={documentId} initialLocale={lang} />
      ))} />

      <BenefitsFooter lang={lang}>
        <EditorServer initialLocale={lang} documentId='benefits-footer' />
      </BenefitsFooter>
    </>
  )
}