import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"


export default async function Page({
    params: { lang }
}: {
    params: { lang: Locale }
}) {

    const { agenda } = await getDictionary(lang)

    return (
        <div className=''>
            <div className='w-full bg-secondary pt-12 pb-6'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 '>
                    <h1 className='text-4xl font-bold pb-6 text-white'>
                        {agenda.success}
                    </h1>
                </div>
            </div>
            {/* Section with Background Image at the Bottom */}
            <div className="relative w-full bg-background pt-12 pb-36">
                <div className='flex flex-col max-w-5xl mx-auto px-8 pt-8 min-h-screen'>
                    <EditorServer documentId='success-day-planning' initialLocale={lang} />
                </div>
            </div>
            <div className='w-full bg-secondary pt-12 pb-36'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 '>
                    <h1 className='text-4xl font-bold pb-6 text-white'>
                        {agenda.upcomingSuccessMasterclasses}
                    </h1>
                    <hr />
                    <SuccessEventOverview lang={lang} agenda={agenda} />
                </div>
            </div>

        </div>
    )
}