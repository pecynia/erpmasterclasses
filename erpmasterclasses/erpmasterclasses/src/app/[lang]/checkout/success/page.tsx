"use client"

import { useSearchParams  } from "next/navigation"
import useSwr from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id")

    const url = session_id ? `/api/stripe/sessions?session_id=${session_id}` : null
    const { data: checkoutSession, error } = useSwr(url, fetcher)

    if (error) return <div>failed to load the session</div>

    const customer = checkoutSession?.session?.customer_details?.email
    const products = checkoutSession?.session?.line_items?.data?.map((item: any) => ({
        ...item.price.product,
        price: item.price.unit_amount,
        quantity: item.quantity,
    }))

    const metadata = checkoutSession?.session?.line_items?.data[0]?.price?.product?.metadata
    const payment = checkoutSession?.session?.payment_intent?.charges?.data[0]?.payment_method_details
    const subtotal = checkoutSession?.session?.amount_subtotal
    const total = checkoutSession?.session?.amount_total
    const discount = checkoutSession?.session?.total_details?.amount_discount
    const tax = checkoutSession?.session?.total_details?.amount_tax

    return (
        <div>
            <h1>Checkout Success</h1>
            <p>Thank you for your purchase!</p>
            <h2>Order Summary</h2>
            <p>Customer: {customer}</p>
            <p>Products: {products?.map((product: any) => product.name).join(", ")}</p>
            <p>Payment Method: {payment?.card?.brand} ending in {payment?.card?.last4}</p>
            <p>date: {metadata?.date}</p>
            <p>Subtotal: {subtotal}</p>
            <p>Discount: {discount}</p>
            <p>Tax: {tax}</p>
            <p>Total: {total}</p>
        </div>
    )
}