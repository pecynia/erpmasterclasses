import React from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getEvents } from '@/lib/utils/db'


const TransformationEventOverview = async ({
    params: { lang, agenda }
}: {
    params: { lang: Locale, agenda: any }
}) => {

    const events = await getEvents(lang)
    const successEvents = events.filter(event => event.type === 'transformation')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default TransformationEventOverview