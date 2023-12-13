"use client"

import { useEffect, useState } from "react"
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
import { Locale, i18n } from "../../../../../i18n.config"

interface EditorWrapperProps {
    documentId: string
    currentLocale: Locale
    link?: string
    buttonText?: string
}

// TODO: CONVERT TO SERVER COMPONENT (so we don't fetch everytime)
const EditorWrapper = ({ documentId, link, buttonText, currentLocale }: EditorWrapperProps) => {
    const { status, data: session } = useSession()
    const [fetchedContent, setFetchedContent] = useState('')

    const allLocales = i18n.locales

    useEffect(() => {
        const fetchData = async () => {
            const contentFromDb = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/content`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Document-ID': documentId,
                    'Locale': currentLocale
                },
            })
            const json = await contentFromDb.json()
            if (json && json.paragraphJson) {
                const contentAsHtml = generateHTML(json.paragraphJson, [
                    StarterKit,
                    TextStyle,
                    Color,
                ])
                setFetchedContent(contentAsHtml)
            }            
        }

        fetchData()
    }, [])

    if (status === "loading") {
        return <motion.div layout className="flex justify-center items-center mt-5 w-full h-full">
            <ReloadIcon className="w-4 h-4 animate-spin" />
        </motion.div>
    }

    return (
        <motion.div layout className="w-full"
            // layout
            // initial={{ opacity: 0}}
            // animate={{ opacity: 1 }}
            // transition={{ type: "spring", ease: "easeInOut", duration: 0.2 }}
        >
            <EditorComponent currentLocale={currentLocale} documentId={documentId} editable={!!session} initialContent={fetchedContent} />
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

