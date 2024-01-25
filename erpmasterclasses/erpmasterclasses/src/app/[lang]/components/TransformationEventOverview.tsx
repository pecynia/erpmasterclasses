"use client"

import React, { useEffect, useState } from 'react'
import EventOverview from '@/app/[lang]/components/EventOverview'
import { Locale } from '@../../../i18n.config'
import { getAllEvents } from '@/app/_actions'
import { EventProps } from '@../../../typings'


const TransformationEventOverview = ({ lang, agenda }: { lang: Locale, agenda: any }) => {
    const [events, setEvents] = useState<EventProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEvents(lang)
            setEvents(result)
            setLoading(false)
        }

        fetchData()
    }, [lang])
    
    if (loading) return <p className='text-primary-foreground py-4'>{agenda.loadingAgenda}</p>

    const successEvents = events.filter(event => event.type === 'transformation')

    return (
        <EventOverview agenda={agenda} allEvents={successEvents} lang={lang} />
    )
}

export default TransformationEventOverview