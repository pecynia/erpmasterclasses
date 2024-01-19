import { Locale } from '@/app/../../i18n.config'

type StoryContent = {
    tags: string | string[] | null | undefined
    slug: string
    title: string
    description: string
    content: string
    date: string
    views: number
}


export interface AdditionalRegistrationFormProps {
    nameParticipant: string
    email: string
}

export interface RegistrationFormProps {
    _id: ObjectId
    companyName: string
    address: string
    country: string
    nameParticipant: string
    phone: string
    email: string
    position: string
    vatNumber: string
    poNumber?: string
    additionalParticipants?: AdditionalRegistrationFormProps[]
}    

// ------------------ EVENTS ------------------

// Event properties for client-side
export type CreateEventProps = {
    title: string
    eventSlug: string
    description: string
    type: EventType
    date: Date
    location?: string
    requiredRegistrations: number
    language: Locale
    shownLanguages: Locale[]
}

// Event properties for client-side
export type EventProps = {
    _id: ObjectId
    title: string
    eventSlug: string
    description: string
    type: EventType
    date: Date
    location?: string
    requiredRegistrations: number
    language: Locale
    shownLanguages: Locale[]
}

// Event properties for server-side
export type EventData = {
    _id: string // the id of the event, same as EventProps._id
    title: string
    eventSlug: string
    description: string
    type: EventType
    date: Date
    location?: string
    requiredRegistrations: number
    language: Locale
    shownLanguages: Locale[]
    registrations: RegistrationFormProps[]
}
