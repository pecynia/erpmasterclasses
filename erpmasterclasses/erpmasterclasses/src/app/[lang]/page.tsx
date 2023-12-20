import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import TestComponent from './components/TestComponent'

export default async function Home({
    params: { lang }
  }: {
    params: { lang: Locale }
  }) {  
    const { page } = await getDictionary(lang)
    
    return (
      <div className='py-16 flex flex-col justify-center items-center '>
        <TestComponent currentLocale={lang} />
      </div>
  )
}
