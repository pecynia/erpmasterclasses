"use client"

import React from 'react'
import { Locale } from '@../../../i18n.config'
import Link from 'next/link'
import { Button } from '@/app/[lang]/components/ui/button'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { motion } from 'framer-motion'

function PricingOverview({ lang, navigation, pricing }: { lang: Locale, navigation: any, pricing: any }) {
    return (
        <>
            {/* Card 1 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='shadow-right-secondary rounded-xl bg-white md:w-1/2 lg:w-1/2 pb-10'
            >
                <div className='h-80'>
                    <h1 className='text-3xl font-bold px-12 pt-10 pb-5'>
                        {pricing.type1.title}
                    </h1>
                    <hr className='mx-12' />
                    <p className='px-12 pt-5'>
                        {pricing.type1.description}
                    </p>
                    <h1 className='text-3xl font-bold px-12 pt-5'>
                        {pricing.type1.price}<span className='text-sm font-light pl-2'>{pricing.type1.perPerson}</span>
                    </h1>
                    <div className='flex flex-col items-center justify-center pt-3'>
                        <Button variant='secondary' className="rounded-lg mt-4" size='lg'>
                            <Link href={`/${lang}${navigation.agenda.href}`}>
                                {pricing.type1.buttonText}
                            </Link>
                        </Button>
                    </div>
                </div>
                <hr className='mx-12 pb-5' />
                <div className='h-96 mb-5'>
                    <EditorWrapper initialLocale={lang} documentId='pricing-card-1-content' />
                </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='shadow-right-secondary rounded-xl bg-white md:w-1/2 lg:w-1/2 pb-10'
            >
                <div className='h-80'>
                    <h1 className='text-3xl font-bold px-12 pt-10 pb-5'>
                        {pricing.type2.title}
                    </h1>
                    <hr className='mx-12' />
                    <p className='px-12 pt-5'>
                        {pricing.type2.description}
                    </p>
                    <h1 className='text-3xl font-bold px-12 pt-5'>
                        {pricing.type2.price}
                    </h1>
                    <div className='flex flex-col items-center justify-center pt-3'>
                        <Button variant='outline' className="rounded-lg mt-4" size='lg'>
                            <Link href={`/${lang}${navigation.contact.href}`}>
                                {pricing.type2.buttonText}
                            </Link>
                        </Button>
                    </div>
                </div>
                <hr className='mx-12 pb-5' />
                <div className='h-48 mb-5'>
                    <EditorWrapper initialLocale={lang} documentId='pricing-card-2-content' />
                </div>
            </motion.div>
        </>
    )
}

export default PricingOverview