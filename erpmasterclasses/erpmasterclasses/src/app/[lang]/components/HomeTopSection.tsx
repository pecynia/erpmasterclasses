"use client"

import React, { useEffect, useState, useRef } from 'react'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Groep1 from '@/../public/imgs/groep-1.png'
import Lenis from '@studio-freight/lenis'


const HomeTopSection: React.FC<{ 
    children: React.ReactNode}> = ({ children }) => {

    // Make smooth Lenis animations
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

    // For keeping track of scroll position
    const container = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    })

    return (
        <div className="relative text-primary-foreground flex flex-col justify-center items-start h-[70vh]">
            <motion.div
                ref={container}
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, dimension.height * 0.25]) }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className='absolute -mt-36 top-0 left-0 w-full h-full flex justify-center items-center'
            >
                <Image
                    src={Groep1}
                    alt="Image"
                    fill
                    className="object-cover object-center -scale-x-100 "
                    style={{ objectPosition: 'center 15%' }}
                />
            </motion.div>

            {/* Content Section */}
            <motion.div layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" absolute left-[10vw] bg-background/90 rounded-md px-auto"
            >
                <div className="w-full pl-4 pr-8 md:pl-10 md:pr-14 mb-1">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export default HomeTopSection
