import Link from 'next/link';
import { Locale } from '@/app/../../i18n.config';
import { getDictionary } from '@/lib/dictionary';
import ClientHeaderButtonWrapper from '@/app/[lang]/components/admin/ClientHeaderButtonWrapper';
import LocaleSwitchButton from '@/app/[lang]/components/lang/LocaleSwitcher';

export default async function Header({ lang }: { lang: Locale }) {
    const { navigation } = await getDictionary(lang);

    return (
        <header className='flex justify-between items-center px-10 py-5 bg-secondary'>
            <div className='flex items-center space-x-2'>
                <Link href='/[lang]' as={`/${lang}`}>
                    <p>{navigation.title.label}</p>
                </Link>
            </div>
            <div className='pr-4'>
                <LocaleSwitchButton locale={lang} />
                <ClientHeaderButtonWrapper />
            </div>
        </header>    
    );
}
