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