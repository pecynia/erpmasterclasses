import React from 'react'
import EditorServer from "@/app/[lang]/components/editor/EditorServer"
import { Locale } from '@../../../i18n.config'
import CookieOverview from '@/app/[lang]/components/CookieOverview'

export default async function Page({
    params: { lang }
}: {
    params: { lang: Locale }
}) {
    return (
        <div className="relative flex flex-col justify-center items-center">
            <div className="relative -mt-20 lg:-mt-10 rounded-3xl w-4/5 sm:w-2/3 md:w-1/2 lg:min-w-[700px] pt-2 pb-4 lg:py-10 px-6 lg:px-4 items-center">
                <EditorServer documentId='cookie-policy' initialLocale={lang} />
            </div>
            <div className='w-full px-4 sm:w-4/5 mb-20'>
                <CookieOverview />
            </div>
        </div>
    )
}