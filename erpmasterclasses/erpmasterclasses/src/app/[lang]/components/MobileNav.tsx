"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@/app/[lang]/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Locale } from '@../../../i18n.config'
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher'
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper'



type Route = {
    label: string
    href: string
}
type Navigation = {
    routes: Route[]
    lang: Locale
}

const MobileNav = ({ routes, lang }: Navigation) => {
    const [open, setOpen] = useState(false)
    const closeSheet = () => setOpen(false)

    return (
        <div className='lg:hidden flex flex-col items-end'>
            <div className='flex items-center gap-4 w-full justify-end'>
                {/* Admin tool and locale switcher  */}
                <ClientHeaderButtonWrapper />
                <LocaleSwitchButton locale={lang} />
            
                {/* Sheet  */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <div className='flex rounded-full p-2 cursor-pointer'>
                            <Menu className="h-6 text-primary" />
                        </div>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className='flex flex-col gap-4 p-4'>
                            {routes.map((route, i) => (
                                <Link key={i} href={route.href} onClick={closeSheet}>
                                    <p className='text-xl'>{route.label}</p>
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default MobileNav
