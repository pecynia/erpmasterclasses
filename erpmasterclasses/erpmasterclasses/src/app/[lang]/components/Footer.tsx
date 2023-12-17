import Link from 'next/link'
import { Locale } from '@/app/../../i18n.config'
import { getDictionary } from '@/lib/dictionary'


export default async function Footer({ lang }: { lang: Locale }) {

    const { navigation } = await getDictionary(lang)

    return (
        <footer className='bg-primary py-8 px-16 text-primary-foreground'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-center'>
                {Object.values(navigation).map((navItem: { label: string; href: string; }, index: number) => (
                    <div key={index} className='flex flex-col items-center'>
                        <Link href={navItem.href} as={`/${lang}${navItem.href}`}>
                            <p>{navItem.label}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </footer>
    )
}


// import Link from 'next/link'
// import { Locale } from '@/app/../../i18n.config'
// import { getDictionary } from '@/lib/dictionary'

// import Image from 'next/image';
// import { routes } from '@/dictionaries/routes';
// import { contactInfo, socialMedia } from '@/dictionaries/contactInfo';
// import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

// const Footer = () => {
//     return (
//         <footer className="bg-primary py-8 px-16 text-primary-foreground">
//             <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">

//                 {/* Logo & Description */}
//                 <div className="flex flex-col items-center">
//                     <Image src='/logo.png' alt='Logo' width={160} height={100} priority />
//                     <p className="text-center mt-4 mb-2">Indonesische Catering voor al uw gelegenheden</p>
//                     <div className="flex space-x-2">
//                         <Link href={socialMedia.instagram || "#"} target="_blank" className='hover:text-secondary-foreground'>
//                             <Instagram className="cursor-pointer" />
//                         </Link>
//                         <Link href={socialMedia.facebook || "#"} target="_blank" className='hover:text-secondary-foreground'>
//                             <Facebook className="cursor-pointer" />
//                         </Link>
//                         <Link href={socialMedia.linkedin || "#"} target="_blank" className='hover:text-secondary-foreground'>
//                             <Linkedin className="cursor-pointer" />
//                         </Link>
//                     </div>
//                 </div>
//                 {/* Navigation */}
//                 <div className=''>
//                     <h1 className="font-youngSerif text-2xl text-secondary-foreground mb-4">Navigatie</h1>
//                     {routes.map(route => (
//                         <Link key={route.href} href={route.href}>
//                             <div className="mb-2 hover:underline cursor-pointer">{route.label}</div>
//                         </Link>
//                     ))}
//                 </div>

                

//                 {/* Contact */}
//                 <div className='space-y-2'>
//                     <h1 className="font-youngSerif text-2xl text-secondary-foreground mb-4">Contact</h1>
//                     <p>{contactInfo.name}</p>
//                     <div className="flex items-center mb-2 hover:text-secondary-foreground">
//                         <Mail className="mr-2" />
//                         <Link href={`mailto:${contactInfo.email}`}>
//                             {contactInfo.email}
//                         </Link>
//                     </div>
//                     <div className="flex items-center hover:text-secondary-foreground">
//                         <Phone className="mr-2" />
//                         <Link href={`tel:${contactInfo.phone}`}>
//                             {contactInfo.phone}
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom */}
//             <div className="mt-8 flex justify-center font-thin items-center space-x-4">
//                 <p>kvk: {contactInfo.kvk}</p>
//                 <p>&copy; Willys2Go {new Date().getFullYear()}</p>
//                 <p>Website made by <span className="font-bold">Humainly</span></p>
//             </div>
//         </footer>
//     );
// }

// export default Footer;
