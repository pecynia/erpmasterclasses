import React from 'react'
import Link from 'next/link'
import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import { HeaderClient } from '@/app/[lang]/components/HeaderClient'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <HeaderClient className='sticky z-50 top-0 left-0 w-full bg-secondary-foreground px-10 py-5 transition-transform duration-300'>
      <MobileNav routes={Object.values(navigation)} lang={lang}/>
      <DesktopNav routes={Object.values(navigation)} lang={lang} />
    </HeaderClient>
  )
}
