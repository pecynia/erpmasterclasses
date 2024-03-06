import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ReviewTopSection from '@/app/[lang]/components/ReviewTopSection'
import ReviewOverview from '@/app/[lang]/components/ReviewOverview'
import ReviewFooter from '@/app/[lang]/components/ReviewFooter'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"


export default async function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  const { review, navigation } = await getDictionary(lang)

  const documentIds = [
    'review-description-1',
    'review-description-2',
    'review-description-3',
    'review-description-4',
    'additional-description-1',
    'review-description-5',
    'review-description-6',	
]

  return (
    <div className='bg-white'>
      <ReviewTopSection lang={lang} review={review} navigation={navigation}/>
      
      <ReviewOverview 
        lang={lang} 
        review={review} 
        reviews={documentIds.map((id, index) => (
          <EditorServer documentId={id} initialLocale={lang} key={index} />
        ))}
      />
      
      <ReviewFooter lang={lang}>
        <EditorServer initialLocale={lang} documentId='overview-footer' />
      </ReviewFooter>
    </div>
  )
}