"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/app/[lang]/components/ui/button'
import { ReloadIcon } from "@radix-ui/react-icons"
import Loading from './loading'
import Container from '@/app/[lang]/components/ui/container'
import AddEvent from '@/app/[lang]/components/admin/AddEvent'
import { getAllEvents } from '@/app/_actions'
import { EventData } from '../../../../typings'

const Page = () => {
    const { status, data: session } = useSession()

    // const [events, setEvents] = useState<EventData[]>([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await getAllEvents()
    //         setEvents(result)
    //     }

    //     fetchData()
    // }, [])

    // if (status === 'loading') {
    //     return <Loading />
    // }

    return (
        <Container>
            <div className='bg-white rounded-lg shadow-lg p-12 mt-10 mb-10 w-full max-w-4xl mx-auto'>
                {/* Event Overview  */}
                
                
                {/* Add Event */}
                <div className='mb-8'>
                    <h2 className='font-bold text-2xl mb-4 text-secondary-foreground'>Add an event</h2>
                    <AddEvent />
                </div>
            </div>
        </Container>
    )
    
}

export default Page
