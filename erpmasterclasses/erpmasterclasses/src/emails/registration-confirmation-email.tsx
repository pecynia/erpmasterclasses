// registration-confirmation-email.tsx
import React from 'react';
import { RegistrationFormProps } from '@/../typings';
import { contactInfo } from '@/dictionaries/contactInfo';

const style = {
    container: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        padding: '20px',
        color: '#333',
        backgroundColor: '#f9f9f9', // light background color
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    header: {
        color: '#444',
        marginBottom: '20px',
    },
    headerSmall: {
        fontSize: '1.2em',
        color: '#666',
    },
    strong: {
        fontWeight: 'bold',
    },
    participant: {
        marginTop: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    footer: {
        marginTop: '20px',
        paddingTop: '10px',
        borderTop: '1px solid #ddd',
        fontSize: '0.9em',
        color: '#666',
    },
};

const RegistrationConfirmationEmail: React.FC<Readonly<RegistrationFormProps & { totalAmount: number, subtotal: number, tax: number, discount: number }>> = ({
    eventTitel,
    eventDate,
    lang,
    companyName,
    address,
    country,
    nameParticipant,
    phone,
    email,
    position,
    vatNumber,
    poNumber,
    additionalParticipants,
    totalAmount,
    subtotal,
    tax,
    discount
}) => (
    <div style={style.container}>
        <h1 style={style.header}>Thank you for your registration</h1>
        <p>You have registered for the following event:</p>
        <p>Event: <strong>{eventTitel}</strong></p>
        <p>Date: <strong>{eventDate?.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        
        <hr />
        <h3 style={style.headerSmall}>Registration Details</h3>
        <p>Company Name: <strong>{companyName}</strong></p>
        <p>Address: <strong>{address}</strong></p>
        <p>Country: <strong>{country}</strong></p>
        <p>Contact Person: <strong>{nameParticipant}</strong> ({email})</p>
        <p>Phone: <strong>{phone}</strong></p>
        <p>Position: <strong>{position}</strong></p>
        <p>VAT Number: <strong>{vatNumber}</strong></p>
        <p>PO Number: <strong>{poNumber}</strong></p>
        
        {additionalParticipants!.length > 0 && <p>Additional Participants:</p>}
        
        {additionalParticipants?.map((contact, index) => (
            <div key={index} style={style.participant}>
                <p><strong>{contact.nameParticipant}</strong> ({contact.email})</p>
            </div>
        ))}

        <hr />

        <p>Subtotal: {subtotal / 100} €</p>
        {discount > 0 && <p>Discount: {discount / 100} €</p>}
        {tax > 0 && <p>Tax: {tax / 100} €</p>}
        <p>Total Amount Paid: {totalAmount / 100} €</p>    

        <div style={style.footer}>
            <p>Thank you for your registration. You will receive an invitation link to the event shortly before the event starts.</p>
            <p>Please do not reply to this email. For any questions, please contact me at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
        </div>
    </div>
);

export default RegistrationConfirmationEmail;
