"use client"

import React from 'react'
import Johndeere from '@/../public/imgs/johndeere.jpg'
import Groep1 from '@/../public/imgs/groep-1.jpg'
import Groep2 from '@/../public/imgs/groep-2.jpg'
import Klantendag from '@/../public/imgs/klantendag.jpg'
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/app/[lang]/components/ui/carousel"

function PricingCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div>
            <Carousel plugins={[Autoplay({ delay: 3500 })]} setApi={setApi}>
                <CarouselPrevious className='text-3xl text-gray-500 hover:text-primary' />
                <CarouselNext className='text-3xl text-gray-500 hover:text-primary' />
                <CarouselContent className='w-full'>
                    <CarouselItem className='relative w-full'>
                        <Image src={Johndeere} alt='John Deere' priority />
                    </CarouselItem>
                    <CarouselItem className='relative w-full'>
                        <Image src={Groep1} alt='Groep 1' />
                    </CarouselItem>
                    <CarouselItem className='relative w-full'>
                        <Image src={Groep2} alt='Groep 2' />
                    </CarouselItem>
                    <CarouselItem className='relative w-full'>
                        <Image src={Klantendag} alt='Klantendag' />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {current} - {count}
            </div>
        </div>
    )
}

export default PricingCarousel