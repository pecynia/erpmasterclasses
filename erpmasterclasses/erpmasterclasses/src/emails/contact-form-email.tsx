import React from 'react'

interface ContactFormEmailProps {
  name: string
  email: string
  phone: string
  eventDate?: string // optional
  companyName?: string // optional
  message: string
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  phone,
  eventDate,
  companyName,
  message
}) => (
  <div>
    <h1>Contact form submission</h1>
    <p>From <strong>{name}</strong> ({email})</p>
    <p>Phone: {phone}</p>
    <p>Event Date: {eventDate || 'Not specified'}</p>
    <p>Company Name: {companyName || 'Not specified'}</p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
)

export default ContactFormEmail
