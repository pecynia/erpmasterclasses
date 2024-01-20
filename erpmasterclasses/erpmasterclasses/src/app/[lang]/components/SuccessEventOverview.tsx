import React from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getEvents } from '@/lib/utils/db'


const SuccessEventOverview = async ({
    params: { lang, agenda }
}: {
    params: { lang: Locale, agenda: any }
}) => {

    const events = await getEvents(lang)
    const successEvents = events.filter(event => event.type === 'success')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default SuccessEventOverview