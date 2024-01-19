import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import NodeCache from 'node-cache'
import { Locale } from '@/app/../../i18n.config'
import { JSONContent } from '@tiptap/react'
import { EventProps, CreateEventProps, EventData, RegistrationFormProps } from '@/../typings'
import { revalidateTag } from 'next/cache'

// -------------------- DATABASE --------------------

// MongoDB Atlas connection URI
const uri: string | undefined = process.env.MONGODB_URI
if (!uri) throw new Error("The MONGODB_URI environment variable must be defined.")

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

let cachedDb: any = null

// Function to connect to the database
async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb
    }

    // Connect the client to the server
    await client.connect()

    const dbName: string | undefined = process.env.MONGODB_DB
    if (!dbName) throw new Error("The MONGODB_DB environment variable must be defined.")

    const db = client.db(dbName)
    cachedDb = db
    return db
}

// -------------------- DATABASE OPERATIONS --------------------


// Get document given id and locale
export async function getParagraphJson(documentId: string, locale: Locale) {
    const db = await connectToDatabase()
    const collection = db.collection('content')
    const result = await collection.findOne({ _id: documentId })

    // Constructing the response to match the original format
    if (result && result.content && result.content[locale]) {
        return {
            _id: result._id,
            paragraphJson: result.content[locale]
        }
    }
    
    return null
}



// Save paragraph JSON content for a specific locale
export async function saveParagraphJson(documentId: string, locale: Locale, paragraphJson: JSONContent) {
    const db = await connectToDatabase()
    const collection = db.collection('content')

    const filter = { _id: documentId }
    const update = { 
        $set: { [`content.${locale}`]: paragraphJson } 
    }

    const result = await collection.updateOne(filter, update, { upsert: true })

    return result
}

// -------------------- EVENT OPERATIONS --------------------

// Get event based on eventSlug and language is in shownLanguages
export async function getEvent(eventSlug: string, language: Locale): Promise<EventProps | null> {
    const db = await connectToDatabase()
    const collection = db.collection('events')
    const result = await collection.findOne({ eventSlug, shownLanguages: language })

    // Constructing the response to match the original format
    if (result) {
        return {
            ...result
        }
    }

    return null
}


// Get all events based on language is in shownLanguages
export async function getEvents(language: Locale): Promise<EventProps[]> {
    const db = await connectToDatabase()
    const collection = db.collection('events')
    const result = await collection.find({ shownLanguages: language }).toArray()

    // Constructing the response to match the original format
    const events = result.map((event: EventProps) => {
        return {
            event,
        }
    })

    return events
}

// Get all events with registrations (ADMIN)
export async function getEventsWithRegistrations(): Promise<EventData[]> {
    const db = await connectToDatabase()
    const collection = db.collection('events')
    const result = await collection.find({}).toArray()

    // Constructing the response to match the original format
    const events = result.map((event: EventData) => {
        return {
            event,
        }
    }) as EventData[]

    return events
}

// Create new event
export async function addEvent(event: CreateEventProps) {
    const db = await connectToDatabase();
    const collection = db.collection('events');

    const _id = new ObjectId();
    const newEvent = { _id, ...event } as EventProps;

    const result = await collection.insertOne(newEvent);

    return { result, _id: _id.toString() };
}


// Update event
export async function updateEvent(event: EventProps) {
    const db = await connectToDatabase()
    const collection = db.collection('events')

    const { _id, ...eventProps } = event
    const filter = { _id: new ObjectId(_id) }
    const update = { $set: eventProps }

    const result = await collection.updateOne(filter, update) as { matchedCount: number, modifiedCount: number, acknowledged: boolean, upsertedId: ObjectId | null, upsertedCount: number }
    
    return result
}

// Delete event
export async function deleteEvent(eventId: string) {
    const db = await connectToDatabase()
    const collection = db.collection('events')

    const result = await collection.deleteOne({ _id: new ObjectId(eventId) }) as { deletedCount: number, acknowledged: boolean }

    return result
}

// Add registration to event
export async function addRegistration(eventId: string, registration: RegistrationFormProps) {
    const db = await connectToDatabase()
    const collection = db.collection('events')

    const filter = { _id: new ObjectId(eventId) }
    const update = { $push: { registrations: registration } }

    const result = await collection.updateOne(filter, update)

    // TODO Send confirmation email

    return result
}

// Delete registration from event
export async function deleteRegistration(eventId: string, registrationId: string) {
    const db = await connectToDatabase()
    const collection = db.collection('events')

    const filter = { _id: new ObjectId(eventId) }
    const update = { $pull: { registrations: { _id: new ObjectId(registrationId) } } }

    const result = await collection.updateOne(filter, update)

    // TODO Send cancellation email

    return result
}

// Update registration from event
export async function updateRegistration(eventId: string, registration: RegistrationFormProps) {
    const db = await connectToDatabase()
    const collection = db.collection('events')

    const filter = { _id: new ObjectId(eventId), "registrations._id": new ObjectId(registration._id) }
    const update = { $set: { "registrations.$": registration } }

    const result = await collection.updateOne(filter, update)

    return result
}





// --------------- CACHING AND SERVER-SIDE PROPS ---------------

// const storyCache = new NodeCache({ stdTTL: 3600 }) // Cache for 1 hour

// function getEnvVar(key: string): string {
//     const value = process.env[key]
//     if (!value) {
//         throw new Error(`Environment variable ${key} is not set.`)
//     }
//     return value
// }

// const STORY_VIEW_THRESHOLD = getEnvVar('STORY_VIEW_THRESHOLD') as unknown as number

// async function getStoryBySlug(slug: string, lang: Locale): Promise<StoryContent> {
//     // Try to get the story from the cache first
//     const cachedStory: Story = storyCache.get(slug) as Story
//     const cachedStoryContent = cachedStory && cachedStory[lang] as StoryContent
//     if (cachedStory) {
//       return cachedStoryContent
//     }
  
//     // If the story is not in the cache, get it from the database
//     const db = await connectToDatabase()
//     const story: Story = await db.collection('stories').findOne({ [`${lang}.slug`]: slug })
//     const storyContent = story && story[lang] as StoryContent
    
//     // If the story has a high view count, cache it
//     if (story && storyContent.views > STORY_VIEW_THRESHOLD) {
//       storyCache.set(slug, story)
//     }
  
//     return storyContent
//   }
  

  
// export default {
//     updateStory,
//     addStory,
//     getStories,
//     getAllStorySlugs,
//     getStoryBySlug,
// }

