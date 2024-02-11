"use client"

import { testSendPdf } from '@/app/_actions'

import React from 'react'

const PdfTestEmailClientComponent = ({ buffer }: { buffer: Buffer }) => {

    const sendPdf = async () => {
        const result = await testSendPdf(buffer)
        console.log(result)
    }

    return (
        <div>
            <button onClick={sendPdf}>Send PDF</button>
        </div>
    )
}

export default PdfTestEmailClientComponent