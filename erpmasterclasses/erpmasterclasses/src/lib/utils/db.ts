import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import NodeCache from 'node-cache'
import { Locale } from '@/app/../../i18n.config'
import { JSONContent } from '@tiptap/react'




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
    const db = await connectToDatabase();
    const collection = db.collection('content');
    const result = await collection.findOne({ _id: documentId });

    // Constructing the response to match the original format
    if (result && result.content && result.content[locale]) {
        return {
            _id: result._id,
            paragraphJson: result.content[locale]
        };
    }
    
    return null;
}



// Save paragraph JSON content for a specific locale
export async function saveParagraphJson(documentId: string, locale: Locale, paragraphJson: JSONContent) {
    const db = await connectToDatabase();
    const collection = db.collection('content');

    const filter = { _id: documentId };
    const update = { 
        $set: { [`content.${locale}`]: paragraphJson } 
    };

    const result = await collection.updateOne(filter, update, { upsert: true });

    return result;
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

export default {
    getParagraphJson
}