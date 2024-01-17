import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ReviewTopSection from '@/app/[lang]/components/ReviewTopSection'
import ReviewOverview from '@/app/[lang]/components/ReviewOverview'

export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { review, navigation } = await getDictionary(lang)

  return (
    <>
      <ReviewTopSection lang={lang} review={review} navigation={navigation}/>
      <ReviewOverview/>
    </>
  )
}