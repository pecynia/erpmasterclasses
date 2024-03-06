"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const BenefitsOverview: React.FC<{ benefitsDescription: React.ReactNode, overviewList: React.ReactNode[] }> = ({ benefitsDescription, overviewList }) => {
    const { scrollYProgress } = useScroll()
    const disappearRight = useTransform(scrollYProgress, [0, 0.3], ['0%', '-30%'])

    return (
        <motion.div layout className='relative container px-4 mx-auto'>
            {/* Descriptive Div */}
            <motion.div
                className="relative mt-40 md:mt-48 ml-auto text-left w-2/3 flex flex-col items-center justify-center"
                style={{ x: disappearRight }}
            >
                {benefitsDescription}
            </motion.div>
            
            <br />
            <br />

            {/* Overview */}
            <div className="relative -mt-16 w-full md:w-3/4 lg:w-4/5 mx-auto px-16 overflow-hidden">
                {overviewList.map((descriptionChild, index) => (
                    <motion.div layout
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: '0%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                        className={`relative flex items-center max-w-5xl w-4/5 md:w-4/5 lg:2/3 px-4 my-16 md:my-24 bg-white ${index % 2 === 0 ? 'shadow-right-secondary ml-auto' : 'shadow-left-secondary mr-auto'}`}
                    >
                        {descriptionChild}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default BenefitsOverview