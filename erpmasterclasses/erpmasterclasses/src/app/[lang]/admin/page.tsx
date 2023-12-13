"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { Button } from '@/app/[lang]/components/ui/button';
import { ReloadIcon } from "@radix-ui/react-icons"
import Loading from './loading';
import Container from '@/app/[lang]/components/ui/container';

const Profile = () => {
    const { status, data: session } = useSession()


    if (status === 'loading') {
        return <Loading />
    }

    return (
        <Container>
            <div className='bg-white rounded-lg shadow-lg p-12 mt-24 h-screen w-full max-w-4xl mx-auto'>
                <h1 className='text-3xl font-youngSerif mb-6'>Welkom {session?.user?.name}</h1>
                <hr className='mb-6' />
    
                {/* Settings */}
                <div className='mb-8'>
                    <h2 className='font-bold text-2xl mb-4 text-secondary-foreground'>Instellingen</h2>
                </div>
            </div>
        </Container>
    )
    
}

export default Profile;
