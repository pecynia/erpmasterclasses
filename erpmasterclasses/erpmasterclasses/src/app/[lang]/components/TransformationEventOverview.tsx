import React from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getEvents } from '@/lib/utils/db'


const TransformationEventOverview: React.FC<{ lang: Locale, agenda: any }> = async ({ lang, agenda }) => {
    const events = await getEvents(lang)
    const successEvents = events.filter(event => event.type === 'transformation')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default TransformationEventOverview