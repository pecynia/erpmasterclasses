"use client"

import React from 'react'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import { Locale } from '@../../../i18n.config'
import { motion, useScroll, useTransform } from 'framer-motion'

const BenefitsOverview: React.FC<{ lang: Locale }> = ({ lang }) => {
    const documentIds = [
        'benefits-description-1',
        'benefits-description-2',
        'benefits-description-3',
        'benefits-description-4',
        'benefits-description-5'
    ]
    const { scrollYProgress } = useScroll()
    const disappearRight = useTransform(scrollYProgress, [0, 0.3], ['0%', '-30%'])

    return (
        <motion.div layout className='container px-4 mx-auto'>
            {/* Descriptive Div */}
            <motion.div
                className="mt-40 md:mt-48 ml-auto text-left w-2/3 flex flex-col items-center justify-center"
                style={{ x: disappearRight }}
            >
                <EditorWrapper documentId='benefit-description' initialLocale={lang} />
            </motion.div>
            <div className="-mt-16 w-full md:w-3/4 lg:w-4/5 mx-auto px-16 overflow-hidden">
                {documentIds.map((documentId, index) => (
                    <motion.div layout
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? '-100%' : '100%' }}
                        whileInView={{ opacity: 1, x: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                        className={`flex items-center max-w-5xl w-4/5 md:w-4/5 lg:2/3 px-4 my-16 md:my-24 bg-white ${index % 2 === 0 ? 'shadow-right-secondary ml-auto' : 'shadow-left-secondary mr-auto'}`}
                    >
                        <EditorWrapper documentId={documentId} initialLocale={lang} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default BenefitsOverview