import React from 'react'
import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { HeaderClient } from '@/app/[lang]/components/HeaderClient'
import MobileNav from '@/app/[lang]/components/MobileNav'
import DesktopNav from '@/app/[lang]/components/DesktopNav'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <HeaderClient className='sticky z-50 top-0 left-0 w-full bg-secondary-foreground px-10 py-5 transition-transform duration-300'>
      <MobileNav routes={Object.values(navigation)} lang={lang}/>
      <DesktopNav routes={Object.values(navigation)} lang={lang} />
    </HeaderClient>
  )
}
