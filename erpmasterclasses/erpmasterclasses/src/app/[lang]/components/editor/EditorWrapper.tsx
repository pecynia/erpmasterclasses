"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from 'next-auth/react'
import { generateHTML } from '@tiptap/html'
import { ReloadIcon } from "@radix-ui/react-icons"

import EditorComponent from "@/app/[lang]/components/editor/EditorComponent"
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { Button } from "@/app/[lang]/components/ui/button"
import { Locale } from "../../../../../i18n.config"

interface EditorWrapperProps {
    documentId: string
    initialLocale: Locale
    link?: string
    buttonText?: string
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ documentId, link, buttonText, initialLocale }) => {
    const { status, data: session } = useSession()
    const [fetchedContent, setFetchedContent] = useState('')

    // State for managing the current locale of the editor
    const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale)


    const handleLocaleChange = async (newLocale: Locale) => {
        console.log("Locale changed to:", newLocale)
        setCurrentLocale(newLocale) // Update the current locale
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/content`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Document-ID': documentId,
                    'Locale': newLocale
                },
            })
            const json = await response.json()
            if (json && json.paragraphJson) {
                const contentAsHtml = generateHTML(json.paragraphJson, [
                    StarterKit,
                    TextStyle,
                    Color,
                ])
                setFetchedContent(contentAsHtml)
            }
        } catch (error) {
            console.error('Error fetching content:', error)
        }
    }

    useEffect(() => {
        handleLocaleChange(currentLocale)
    }, [currentLocale])

    if (status === "loading") {
        return (
            <motion.div layout className="flex justify-center items-center mt-5 w-full h-full">
                <ReloadIcon className="w-4 h-4 animate-spin" />
            </motion.div>
        )
    }

    return (
        <motion.div layout className="w-full">
            <EditorComponent
                currentLocale={currentLocale}
                documentId={documentId}
                editable={!!session}
                initialContent={fetchedContent}
                onLocaleChange={handleLocaleChange}
            />
            {link && buttonText && (
                <div className="px-4 flex justify-center">
                    <Button className="rounded-none mt-4">
                        <Link href={link}>
                            <p>{buttonText}</p>
                        </Link>
                    </Button>
                </div>
            )}
        </motion.div>
    )
}

export default EditorWrapper
