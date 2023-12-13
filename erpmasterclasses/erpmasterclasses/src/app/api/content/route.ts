import { NextResponse } from "next/server"
import { getParagraphJson } from "@/lib/utils/db"
import { Locale } from "@/app/../../../i18n.config"

// Get a paragraph 
export async function GET(request: Request) {
    const documentId = request.headers.get("Document-ID")
    const locale = request.headers.get("Locale") as Locale

    if (!documentId) {
        return NextResponse.json({ error: "Document-ID header is missing." }, { status: 400 })
    }
    const result = await getParagraphJson(documentId, locale)
    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    })
}

