import { loadStripe } from '@stripe/stripe-js'
import { EventProps } from '@../../../typings'
import Stripe from 'stripe'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)



export const checkout = async (events: EventProps[]) => {
    try {
        const lineItems = events.map((event) => ({
            price: event.stripePriceId,
            quantity: 1,
        }))
        console.log("Products", events)
        const { session } = await fetch('/api/stripe/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),
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