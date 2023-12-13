import LocaleIcons from '@/app/[lang]/components/lang/LocaleIcon'
import Image from 'next/image'
import { Locale } from '../../../../../i18n.config'

const EditorLocaleSwitcher = ({ currentLocale }: { currentLocale: Locale }) => {
    return (
        <div className='absolute top-0 right-0 -mt-16 mr-8 z-10 bg-white shadow-lg rounded-xl'>
            <div className='flex items-center px-4 py-2'>
                <p className='text-sm font-medium'>Currently editing: </p>
                <Image
                    alt={currentLocale.toUpperCase()}
                    src={LocaleIcons[currentLocale]}
                    width={24}
                    height={24}
                    className="ml-2"
                />
                <p className='text-sm font-medium ml-2'>{currentLocale.toUpperCase()}</p>
            </div>
        </div>
    )
}

export default EditorLocaleSwitcher