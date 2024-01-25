"use client"

import React, { useEffect, useState } from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { EventProps } from '@../../../typings'
import { getAllEvents } from '@/app/_actions'


const SuccessEventOverview = ({ lang, agenda }: { lang: Locale, agenda: any }) => {
    const [events, setEvents] = useState<EventProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEvents(lang)
            setEvents(result)
        }

        fetchData()
    }, [lang])
    const successEvents = events.filter(event => event.type === 'selection')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default SuccessEventOverview