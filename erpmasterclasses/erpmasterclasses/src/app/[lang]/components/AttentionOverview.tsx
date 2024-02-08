import { Locale } from "@../../../i18n.config"
import EditorWrapper from "@/app/[lang]/components/editor/EditorWrapper"


const AttentionOverview = ({ lang, pricing, navigation }: { lang: Locale, pricing: any, navigation: any }) => {

    return (
        <div className='flex flex-col items-center justify-center pt-10'>
            <div className='relative rounded-xl bg-white shadow-right-secondary w-full'>
                <div className='flex flex-col max-w-5xl mx-auto px-8 py-8'>
                    <h1 className='text-3xl font-bold pb-4 px-4 '>
                        {pricing.type2.attention}
                    </h1>
                    <hr className='mx-4' />
                    <EditorWrapper initialLocale={lang} documentId='pricing-pay-attention' />
                </div>
            </div>
        </div>
    )
}

export default AttentionOverview
