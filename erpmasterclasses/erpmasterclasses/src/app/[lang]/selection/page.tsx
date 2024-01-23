import React from 'react'
import { Locale } from '@/app/../../../i18n.config'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { getDictionary } from '@/lib/dictionary'
import SuccessEventOverview from '@/app/[lang]/components/SuccessEventOverview'


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
            <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 min-h-screen'>
                <EditorWrapper documentId='success-day-planning' initialLocale={lang} />
            </div>
            <div className='w-full bg-secondary pt-12 pb-36'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8 '>
                    <h1 className='text-4xl font-bold pb-6 text-white'>
                        {agenda.upcomingSuccessMasterclasses}
                    </h1>
                    <hr />
                    <SuccessEventOverview lang={ lang} agenda={agenda } />
                </div>
            </div>

        </div>
    )
}