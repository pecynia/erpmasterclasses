import React from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getEvents } from '@/lib/utils/db'

export async function SuccessEventOverview({ agenda, lang }: { agenda: any, lang: Locale }) {
    const events = await getEvents(lang)
    const successEvents = events.filter(event => event.type === 'selection')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default SuccessEventOverview