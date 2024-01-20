import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import Image from 'next/image'
import Groep1 from '@/../public/imgs/groep-1.jpg'
import { Button } from '@/app/[lang]/components/ui/button'
import Link from 'next/link'

const ReviewFooter: React.FC<{ lang: Locale }> = async ({ lang }) => {
    
    const { benefits, navigation } = await getDictionary(lang)

    return (
        <div className='flex flex-col relative -mt-32 bg-background pb-10'>
            <Image 
                src={Groep1}
                alt="Image" 
                fill
                className="object-cover object-center"
                style={{ objectPosition: 'center 15%' }}
            />
            <div className='relative container mx-auto px-4 py-36'>
                <div className='bg-white shadow-xl py-10 rounded-xl flex flex-col items-center justify-center text-center w-full lg:w-2/3 mx-auto'>
                    <EditorWrapper initialLocale={lang} documentId='overview-footer' />
                    <Button size='lg' variant='secondary' className='text-md'>
                        <Link href={`/${lang}${navigation.investment.href}`} className='flex items-center'>
                            {benefits.CTA}!
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewFooter