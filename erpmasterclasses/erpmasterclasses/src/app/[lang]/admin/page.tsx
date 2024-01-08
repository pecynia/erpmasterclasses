"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/app/[lang]/components/ui/button'
import { ReloadIcon } from "@radix-ui/react-icons"
import Loading from './loading'
import Container from '@/app/[lang]/components/ui/container'
import AddEvent from '@/app/[lang]/components/admin/AddEvent'

const Profile = () => {
    const { status, data: session } = useSession()


    if (status === 'loading') {
        return <Loading />
    }

    return (
        <Container>
            <div className='bg-white rounded-lg shadow-lg p-12 mt-10 mb-10 w-full max-w-4xl mx-auto'>
                {/* Add Event */}
                <div className='mb-8'>
                    <h2 className='font-bold text-2xl mb-4 text-secondary-foreground'>Add an event</h2>
                    <AddEvent />
                </div>
            </div>
        </Container>
    )
    
}

export default Profile
