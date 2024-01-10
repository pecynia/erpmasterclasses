"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Uitleg from '@/../public/imgs/uitleg.jpg';

const AboutTopSection = () => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({ container: ref });
    const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const slideRight = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
    const slideDown = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

    return (
        <div ref={ref} className="relative h-[90vh] mb-10">
            {/* Image */}
            <motion.div
                className="absolute inset-0"
                style={{ opacity: fadeOut }}
            >
                <Image
                    src={Uitleg}
                    alt="About Image"
                    fill
                    className='object-cover w-full h-full'
                    objectPosition='center 30%'
                />
            </motion.div>

            {/* Description */}
            <motion.div
                className="absolute right-0 -bottom-28 p-20"
                style={{
                    x: slideRight,
                    y: slideDown,
                }}
            >
                {/* <div className="bg-white p-14">
                    <h2 className="text-2xl font-bold mb-2">Guus Krabbenborg</h2>
                    <p>Business trainer, consultant and presenter</p>
                </div> */}
            </motion.div>
        </div>
    );
};

export default AboutTopSection;
