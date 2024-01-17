"use client"

import { Badge } from '@/app/[lang]/components/ui/badge'
import { EventData } from "@/../../../../typings"
import LocaleIcons from "@/app/[lang]/components/lang/LocaleIcon"
import Image from "next/image"
import DeleteEvent from "@/app/[lang]/components/admin/DeleteEvent"

import React from 'react'
import UpdateEvent from "@/app/[lang]/components/admin/UpdateEvent"

const EventOverview: React.FC<{ allEvents: EventData[], setEventData: React.Dispatch<React.SetStateAction<EventData[]>> }> = ({ allEvents, setEventData }) => {    
    return (
        <div className='flex flex-col gap-4 pt-2'>
            <div className='flex flex-col gap-4 overflow-y-auto h-72'>
                {allEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                    <div className='bg-gray-50 flex flex-row gap-4 items-center p-2 pl-4 rounded-md' key={index}>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='text-lg font-bold'>{event.title}</p>
                                <Badge variant='secondary'>
                                    <Image alt={event.language} src={LocaleIcons[event.language]} width={16} />
                                    <p className='text-sm pl-1'>{event.language.toUpperCase()}</p>
                                </Badge>
                            </div>
                            <p className='text-sm'>{event.date.toLocaleDateString()}</p>
                        </div>
                        <div className='flex flex-row gap-2 ml-auto mr-2'>
                            <UpdateEvent existingEvent={event} allEvents={allEvents} setEventData={setEventData} />
                            <DeleteEvent eventId={event._id} allEvents={allEvents} setEventData={setEventData} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default EventOverview
