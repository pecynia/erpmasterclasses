'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/app/[lang]/components/ContactForm'
import { Locale } from '../../../../i18n.config'


function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 
  return (
    <div className='flex flex-col items-center justify-center w-full py-20 relative'>
        <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: true }}
          className='min-w-[70%] lg:min-w-[40%] min-h-[20%] max-w-[80%] mb-20 pb-10 flex px-10 pt-4 rounded-xl  bg-white shadow-xl'
        >
          <div className='w-full pt-2'>
            <ContactForm lang={lang} />
          </div>
        </motion.div>
      </div>
  )
}

export default Page
