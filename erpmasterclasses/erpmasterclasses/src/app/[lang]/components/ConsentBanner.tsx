'use client'

import { useState, useEffect } from 'react'
import { setConsent } from '../../../../gtag'
import { Button } from '@/app/[lang]/components/ui/button'
import { Locale } from '../../../../i18n.config'
import Link from 'next/link'

type ConsentBannerProps = {
  onConsentChange: (consent: boolean | null) => void
  lang: Locale
  children: React.ReactNode
}

const consentTexts = {
  en: {
    accept: "Accept",
    decline: "Decline",
    moreinfo: "More Information"
  },
  de: {
    accept: "Akzeptieren",
    decline: "Ablehnen",
    moreinfo: "Mehr Informationen"
  },
  nl: {
    accept: "Accepteer",
    decline: "Nee, bedankt",
    moreinfo: "Meer informatie"
  }
}

const ConsentBanner = ({ onConsentChange, lang, children }: ConsentBannerProps) => {
  const [consent, setConsentState] = useState<boolean | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedConsent = localStorage.getItem('ga_consent')
    if (savedConsent !== null) {
      const parsedConsent = JSON.parse(savedConsent)
      setConsentState(parsedConsent)
      setConsent(parsedConsent)
      onConsentChange(parsedConsent)
    }
  }, [onConsentChange])

  const handleAccept = () => {
    setConsentState(true)
    setConsent(true)
    localStorage.setItem('ga_consent', 'true')
    onConsentChange(true)
  }

  const handleDecline = () => {
    setConsentState(false)
    setConsent(false)
    localStorage.setItem('ga_consent', 'false')
    onConsentChange(false)
  }

  if (!isClient || consent !== null) {
    return null
  }

  const texts = consentTexts[lang]

  return (
    <div className="fixed bottom-4 left-4 z-20 bg-white p-8 w-11/12 md:w-2/5 rounded-lg">
      <div className='-mt-4'>
        {children}
      </div>
      <Button className='w-full mb-2' onClick={handleAccept}>{texts.accept}</Button>
      <div className='flex justify-between space-x-2'>
        <Button variant='outline' className='w-1/2' onClick={handleDecline}>{texts.decline}</Button>
        <Button variant='outline' className='w-1/2'><Link href={`/${lang}/cookie-policy`}>{texts.moreinfo}</Link></Button>
      </div>
    </div>
  )
}

export default ConsentBanner
