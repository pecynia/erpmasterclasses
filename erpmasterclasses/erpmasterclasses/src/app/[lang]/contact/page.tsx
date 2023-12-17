'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ContactForm from '@/app/[lang]/components/ContactForm'
import Vlam from './/../../../../public/vlam.png'
import { Locale } from '../../../../i18n.config'


function Page({
  params: { lang }
}: {
  params: { lang: Locale }
}) { 
  return (
    <div className='flex flex-col items-center justify-center w-full py-36 relative'>
        <Image 
            src={Vlam}
            alt="Image" 
            fill
            className="object-cover object-center"
        />
        <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: true }}
          className='min-w-[80%] lg:min-w-[50%] min-h-[20%] max-w-[80%] bg-secondary mb-20 pb-10 flex px-10 pt-4 z-10'
        >
          <div className='w-full pt-2'>
            <ContactForm lang={lang} />
          </div>
        </motion.div>
      </div>
  )
}

export default Page
