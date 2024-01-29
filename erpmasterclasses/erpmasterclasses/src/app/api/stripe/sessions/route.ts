import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function POST(request: Request) {
    const { lineItems } = await request.json()

    console.log("lineitems", lineItems)

    if (!lineItems) {
        return new Response(JSON.stringify({ error: "lineItems is required" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${request.headers.get('Origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: request.headers.get('Origin')!,
    })

    return new Response(JSON.stringify({ session }), {
        headers: { "Content-Type": "application/json" },
    })
}