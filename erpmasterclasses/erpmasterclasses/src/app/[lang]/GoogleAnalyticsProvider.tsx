'use client'

import { useState, useEffect } from 'react'
import GoogleAnalytics from '@/app/[lang]/GoogleAnalytics'
import ConsentBanner from '@/app/[lang]/components/ConsentBanner'
import { Locale } from '../../../i18n.config'

type AnalyticsProviderProps = {
    children: React.ReactNode
    lang: Locale
    description: React.ReactNode
}

const GoogleAnalyticsProvider = ({ children, lang, description }: AnalyticsProviderProps) => {
    const [consent, setConsent] = useState<boolean | null>(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const savedConsent = localStorage.getItem('ga_consent')
        if (savedConsent !== null) {
            const parsedConsent = JSON.parse(savedConsent)
            setConsent(parsedConsent)
        }
    }, [])

    const handleConsentChange = (consent: boolean | null): void => {
        setConsent(consent)
    }

    if (!isClient) {
        return null
    }

    return (
        <>
            {consent === true && <GoogleAnalytics consent={consent} />}
            <ConsentBanner onConsentChange={handleConsentChange} lang={lang}>
                {description}
            </ConsentBanner>
            {children}
        </>
    )
}

export default GoogleAnalyticsProvider
