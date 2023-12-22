interface Location {
    street: string;
    number: string;
    city: string;
    zip: string;
}

export const location: Location = {
    street: "",
    number: "",
    city: "",
    zip: "",
}

interface ContactInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
    kvk: string;
}

export const contactInfo: ContactInfo = {
    name: "ERPMASTERCLASSES",
    address: `${location.street} ${location.number}, ${location.zip} ${location.city}`,
    email: "gk@dynamicsandmore.com",
    phone: "+31622496073 ",
    kvk: "09122310",
}

interface SocialMedia {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
}

export const socialMedia: SocialMedia = {
    linkedin: "https://www.linkedin.com/in/guuskrabbenborg",
}