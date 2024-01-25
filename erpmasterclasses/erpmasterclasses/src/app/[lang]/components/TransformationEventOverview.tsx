"use client"

import React, { useEffect, useState } from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getAllEvents } from '@/app/_actions'
import { EventProps } from '@../../../typings'


async function TransformationEventOverview({ lang, agenda }: { lang: Locale, agenda: any }) {
    const [events, setEvents] = useState<EventProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEvents(lang)
            setEvents(result)
        }

        fetchData()
    }, [])
    const successEvents = events.filter(event => event.type === 'transformation')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default TransformationEventOverview