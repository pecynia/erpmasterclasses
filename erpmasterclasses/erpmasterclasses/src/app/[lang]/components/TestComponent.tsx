"use client"

import React from 'react'
import { motion } from "framer-motion"
import TextComponent from '@/app/[lang]/components/editor/TextComponent'
import { Locale } from '../../../../i18n.config'


function TestComponent({ currentLocale }: { currentLocale: Locale }) {
  return (
    <motion.div layout
        initial={{ opacity: 0, x: '-10%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ type: "spring", ease: "easeInOut", duration: 0.3 }}
        className='relative w-full h-full flex justify-center items-center'
    >   
      <TextComponent documentId='initial-test' currentLocale={currentLocale} />
    </motion.div>
  )
}

export default TestComponent