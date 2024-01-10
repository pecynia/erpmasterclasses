import React from 'react'
import Link from 'next/link'
import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import { HeaderClient } from '@/app/[lang]/components/HeaderClient'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang)

  return (
    <HeaderClient className='sticky z-50 top-0 left-0 w-full bg-secondary-foreground px-10 py-5 transition-transform duration-300'>
      <nav className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          {Object.values(navigation).map((navItem, index) => (
            <Link key={index} href={`/${lang}${navItem.href}`}>
              <p className='transition-colors px-4 text-primary text-md font-light'>{navItem.label}</p>
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4 pr-4'>
          <ClientHeaderButtonWrapper />
          <LocaleSwitchButton locale={lang} />
        </div>
      </nav>
    </HeaderClient>
  )
}
