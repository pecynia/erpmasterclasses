"use client"

import ClientContactForm from './ClientContactForm';
import { motion } from 'framer-motion';
import { ClientContactFormProps } from './ClientContactForm';

export default async function ContactForm({ localization, errorMessages }: ClientContactFormProps) {
  return (
    <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          whileInView={{ opacity: 1, y: '0%' }}
          transition={{ type: "spring", ease: "easeInOut", duration: 0.5 }}
          viewport={{ once: true }}
          className='min-w-[70%] lg:min-w-[40%] min-h-[20%] max-w-[80%] mb-20 pb-10 flex px-10 pt-4 rounded-xl  bg-white shadow-xl'
        >
          <div className='w-full pt-2'>
            <ClientContactForm localization={localization} errorMessages={errorMessages} />
          </div>
    </motion.div>
  );
}