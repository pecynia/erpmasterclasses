import { Locale } from '@/app/../../i18n.config'
import HomeTopSection from '@/app/[lang]/components/HomeTopSection'
import HomeOverview from '@/app/[lang]/components/HomeOverview'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"

// ERP Transformation Masterclass
// All Masterclasses start at 9:30 am and end at 5 pm
// 950
// 10

export default function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {

  return (
    <div>
      <HomeTopSection>
        <EditorServer documentId='home-top-section-catchphrase' initialLocale={lang} />
      </HomeTopSection>

      <HomeOverview
        editorDescription={<EditorServer documentId='home-description' initialLocale={lang} />}
        editorLetter={<EditorServer documentId='home-letter' initialLocale={lang} />}
      />
    </div>
  )
}
