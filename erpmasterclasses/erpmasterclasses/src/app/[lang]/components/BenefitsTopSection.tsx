"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Tja from '@/../public/imgs/tja.jpg'
import { motion } from 'framer-motion'
import { Locale } from '@../../../i18n.config'
import { Button } from './ui/button'
import EditorWrapper from '@/app/[lang]/components/editor/EditorWrapper'
import Lenis from '@studio-freight/lenis'

type BenefitProps = {
    title: string
    description: string
    buttonText: string
}

const BenefitsTopSection: React.FC<{ benefits: BenefitProps, lang: Locale }> = ({ benefits, lang }) => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 })
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothTouch: true,
            normalizeWheel: true,
        })

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener('resize', resize)
        requestAnimationFrame(raf)
        resize()

        return () => {
            lenis.destroy()
            window.removeEventListener('resize', resize)
        }
    }, [])
    return (
        <div className="relative bg-secondary text-primary-foreground flex flex-col justify-center items-center">
            {/* Header Section */}
            <div className="text-center py-20 px-4 w-4/5 lg:w-2/3">
                <h1 className="text-5xl font-bold mb-4">{benefits.title}</h1>
                <p className="text-xl mb-6">{benefits.description}</p>
                <Link href={`/${lang}/contact`}>
                    <Button variant='outlineInverse' className="px-8 py-6 mb-6 lg:mb-0 text-xl text-primary duration-300 border-2">
                        {benefits.buttonText}
                    </Button>
                </Link>
            </div>

            {/* Content Section */}
            <motion.div layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="-mt-20 lg:-mt-10 bg-white text-primary rounded-3xl w-4/5 lg:w-1/2 py-10 px-10 flex justify-between items-center shadow-xl"
            >
                <div className="w-full lg:w-1/2 px-0 lg:px-4">
                    <EditorWrapper documentId={'benefits-description-list'} initialLocale={lang} />
                </div>
                <div className="w-1/2 hidden lg:block">
                    <Image src={Tja} alt="Benefit Image" width={500} height={300} className='object-cover rounded-2xl' priority />
                </div>
            </motion.div>

            {/* Remaining Section */}
            <div className="bg-background h-[10vh] -mt-48 "></div>
        </div>
    )
}

export default BenefitsTopSection
