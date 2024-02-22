import Stripe from 'stripe'
import { AdditionalRegistrationFormProps, EventProps, RegistrationFormProps } from '@../../../typings'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
import { addRegistration } from '@/lib/utils/db'
import { Locale } from '@../../../i18n.config'
import { PaymentDetails, sendRegistrationConfirmationEmail, sendRegistrationEmail, sendCheckoutExpiredEmail } from '@/app/_actions'
import { generateInvoicePDF } from '@/app/[lang]/components/GenerateInvoicePDF'

// Helper function to safely parse JSON strings in metadata
function safelyParseJSON(jsonString: string | undefined) {
    try {
        return jsonString ? JSON.parse(jsonString) : null
    } catch (e) {
        console.error('Error parsing JSON string:', e)
        return null
    }
}

// Webhook for receiving events from Stripe, in case of succesful payment
export async function POST(request: Request) {
    const payload = await request.text()
    const sig = request.headers.get('stripe-signature')!
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
        console.error(err)
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            
            // Extract and parse fields from session metadata
            const {
                _id,
                eventTitel,
                eventDate,
                lang,
                companyName,
                companyWebsite,
                address,
                country,
                nameParticipant,
                phone,
                email,
                position,
                vatNumber,
                poNumber
            } = session.metadata || {}

            const additionalParticipants = safelyParseJSON(session.metadata?.additionalParticipants) as AdditionalRegistrationFormProps[]
            const selectedEvent = safelyParseJSON(session.metadata?.selectedEvent) as EventProps

            // Construct the RegistrationFormProps object
            const registrationForm: RegistrationFormProps = { 
                _id: _id,
                eventTitel: eventTitel,
                eventDate: new Date(eventDate),
                lang: lang as Locale,
                companyName,
                companyWebsite,
                address,
                country,
                nameParticipant,
                phone,
                email,
                position,
                vatNumber,
                poNumber,
                additionalParticipants,
                selectedEvent
            }
            
            // Add registration to event in database
            const result = await addRegistration(registrationForm)

            // Send confirmation email to customer
            const paymentDetails = {
                subtotal: session.amount_subtotal!,
                totalAmount: session.amount_total!,
                discount: session.total_details?.amount_discount!,
                tax: session.total_details?.amount_tax!,
                customer_details: session.customer_details
            } as PaymentDetails

            // Create PDF buffer
            const pdfBuffer = await generateInvoicePDF(registrationForm, paymentDetails)

            // Send email to admin
            const adminEmailResult = await sendRegistrationEmail(registrationForm, registrationForm.selectedEvent, pdfBuffer)

            // Send confirmation email to customer
            const emailResult = await sendRegistrationConfirmationEmail(registrationForm, paymentDetails, pdfBuffer)
            
            if (result.acknowledged && emailResult.success && adminEmailResult.success) {
                console.log('Registration and confirmation email sent successfully')
                return new Response(JSON.stringify({ received: true }), {
                    headers: { "Content-Type": "application/json" },
                })
            } else {
                console.error('Error sending admin email:', adminEmailResult.error)
                console.error('Error sending confirmation email:', emailResult.error)
            }
            break
        // Checkout expired
        case 'checkout.session.expired':
            const expiredSession = event.data.object as Stripe.Checkout.Session
            
            // Extract and parse fields from session metadata
            const {
                _id: expiredId,
                eventTitel: expiredEventTitel,
                eventDate: expiredEventDate,
                lang: expiredLang,
                companyName: expiredCompanyName,
                companyWebsite: expiredCompanyWebsite,
                address: expiredAddress,
                country: expiredCountry,
                nameParticipant: expiredNameParticipant,
                phone: expiredPhone,
                email: expiredEmail,
                position: expiredPosition,
                vatNumber: expiredVatNumber,
                poNumber: expiredPoNumber
            } = expiredSession.metadata || {}

            const expiredAdditionalParticipants = safelyParseJSON(expiredSession.metadata?.additionalParticipants) as AdditionalRegistrationFormProps[]
            const expiredSelectedEvent = safelyParseJSON(expiredSession.metadata?.selectedEvent) as EventProps

            // Construct the RegistrationFormProps object
            const expiredRegistrationForm: RegistrationFormProps = { 
                _id: expiredId,
                eventTitel: expiredEventTitel,
                eventDate: new Date(expiredEventDate),
                lang: expiredLang as Locale,
                companyName: expiredCompanyName,
                companyWebsite: expiredCompanyWebsite,
                address: expiredAddress,
                country: expiredCountry,
                nameParticipant: expiredNameParticipant,
                phone: expiredPhone,
                email: expiredEmail,
                position: expiredPosition,
                vatNumber: expiredVatNumber,
                poNumber: expiredPoNumber,
                additionalParticipants: expiredAdditionalParticipants,
                selectedEvent: expiredSelectedEvent
            }
            
            // Send email to admin
            const adminExpiredEmailResult = await sendCheckoutExpiredEmail(expiredRegistrationForm)

            if (adminExpiredEmailResult.success) {
                console.log('Checkout expired email sent successfully')
                return new Response(JSON.stringify({ received: true }), {
                    headers: { "Content-Type": "application/json" },
                })
            } else {
                console.error('Error sending checkout expired email:', adminExpiredEmailResult.error)
            }
            break
        default:
            console.warn(`Unhandled event type ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
    })
}











