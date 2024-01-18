import React from 'react'
import { Locale } from '@../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import Groep2 from '@/../public/imgs/groep-2.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/[lang]/components/ui/button'


const BenefitsFooter: React.FC<{ lang: Locale }> = async ({ lang }) => {
    
    const { benefits, navigation } = await getDictionary(lang)

    return (
        <div className='flex flex-col relative pb-10'>
            <Image 
                src={Groep2}
                alt="Image" 
                fill
                className="object-cover object-center"
                style={{ objectPosition: 'center 15%' }}
            />
            <div className='relative container mx-auto px-4 py-36'>
                <div className=' bg-white shadow-xl py-10 rounded-xl flex flex-col items-center justify-center text-center w-full lg:w-2/3 mx-auto'>
                    <EditorWrapper initialLocale={lang} documentId='benefits-footer' />
                    <Button size='lg' variant='secondary' className='text-md'>
                        <Link href={`/${lang}${navigation.agenda.href}`} className='flex items-center'>
                            {benefits.CTA}!
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BenefitsFooter