import { loadStripe } from '@stripe/stripe-js'
import { RegistrationFormProps } from '@../../../typings'
import Stripe from 'stripe'
import { Locale } from '@../../../i18n.config'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


export const checkout = async (lang: Locale, registration: RegistrationFormProps) => {
    try {
        const quantity = registration.additionalParticipants ? registration.additionalParticipants.length + 1 : 1
        const lineItems = [
            {
                price: registration.selectedEvent.stripePriceId,
                quantity: quantity,
                dynamic_tax_rates: [
                    'txr_1Oiy9EIs2202NSkNkGJ7wRQc',
                ],
            },
        ]
        const customer_details = {
            email: registration.email,
            name: registration.nameParticipant,
            phone: registration.phone
        }
        // Serialize complex objects and arrays
        const checkoutMetadata = {
            _id: registration._id,
            eventTitel: registration.selectedEvent.title,
            eventDate: registration.selectedEvent.date.toISOString(), // Convert date to string
            lang: registration.selectedEvent.language,
            companyName: registration.companyName,
            companyWebsite: registration.companyWebsite,
            address: registration.address,
            country: registration.country,
            nameParticipant: registration.nameParticipant,
            phone: registration.phone,
            email: registration.email,
            position: registration.position,
            vatNumber: registration.vatNumber,
            poNumber: registration.poNumber,
            additionalParticipants: JSON.stringify(registration.additionalParticipants), // Serialize array
            selectedEvent: JSON.stringify(registration.selectedEvent) // Serialize object
        }

        const { session } = await fetch('/api/stripe/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'lang': lang
            },
            body: JSON.stringify({ lineItems, checkoutMetadata, customer_details }),
        }).then((res) => res.json()) as { session: Stripe.Checkout.Session }

        const stripe = await stripePromise
        const { error } = await stripe!.redirectToCheckout({
            sessionId: session.id,
        })

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        console.error(error)
    }
}