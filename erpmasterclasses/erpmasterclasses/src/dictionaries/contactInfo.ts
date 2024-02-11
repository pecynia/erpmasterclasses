interface Location {
    street: string
    number: string
    city: string
    zip: string
    state: string
    country: string
}

export const location: Location = {
    street: "Pad van Witte Veder",
    number: "13",
    city: "Wageningen",
    zip: "6708TS",
    state: "Gelderland",
    country: "Netherlands",
}

interface ContactInfo {
    name: string
    address: string
    phone: string
    email: string
    kvk: string
    vatNumber: string
}

export const contactInfo: ContactInfo = {
    name: "ERP Masterclasses",
    address: `${location.street} ${location.number}, ${location.zip} ${location.city}, ${location.country}`,
    email: "gk@erpmasterclasses.com",
    phone: "+31 622 496 073 ",
    kvk: "09122310",
    vatNumber: "NL809924328B01",
}

interface SocialMedia {
    instagram?: string
    facebook?: string
    linkedin?: string
}

export const socialMedia: SocialMedia = {
    linkedin: "https://www.linkedin.com/in/guuskrabbenborg",
}