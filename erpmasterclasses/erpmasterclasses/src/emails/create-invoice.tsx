import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { RegistrationFormProps } from '@/../../../../typings';
import { PaymentDetails } from '@/app/_actions';
import { contactInfo } from '@/dictionaries/contactInfo';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 40,  // Increased padding
    },
    header: {
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    leftColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '50%',
        fontSize: 8,
    },
    rightColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '50%',
        fontSize: 8,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 10,  // Smaller font size
        marginBottom: 5,
    },
    date: {
        fontSize: 10,
        marginBottom: 20,
        textAlign: 'right',
    },
    bold: {
        fontWeight: 'bold',
    },
    orderSummary: {
        marginTop: 20,
        paddingTop: 10,
    },
    line: {
        borderBottom: '1px solid #ddd',
        marginBottom: 5,
    },
    break: {
        height: 5,  // small fixed height for a subtle break
    },
    divider: {
        borderBottom: '1px solid transparent',
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 40,
        right: 40,
        paddingTop: 10,
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    }
});

// DocumentPDF Component
export const DocumentPDF = ({ data, paymentDetails }: { data: RegistrationFormProps, paymentDetails: PaymentDetails }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <Text style={styles.header}>Registration Invoice</Text>

            {/* Date  */}
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>

            {/* Billing and Company Info */}
            <View style={styles.section}>
                <View style={styles.leftColumn}>
                    <Text style={[styles.text, styles.bold]}>Billed to:</Text>
                    <Text style={styles.text}>{data.companyName}</Text>
                    <Text style={styles.text}>{data.nameParticipant}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.line1}</Text>
                    {paymentDetails.customer_details.address.line2 && <Text style={styles.text}>{paymentDetails.customer_details.address.line2}</Text>}
                    <Text style={styles.text}>{paymentDetails.customer_details.address.postal_code} {paymentDetails.customer_details.address.city}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.country}</Text>
                    <View style={styles.break} />
                    <Text style={styles.text}>{data.phone}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.email}</Text>
                    <Text style={styles.text}>{data.companyWebsite}</Text>
                    <Text style={styles.text}>VAT {data.vatNumber}</Text>
                    {data.poNumber && <Text style={styles.text}>PO: {data.poNumber}</Text>}
                </View>

                <View style={styles.rightColumn}>
                    <Text style={styles.title}>Dynamics and More</Text>
                    <Text style={styles.text}>Pad van Witte Veder 13</Text>
                    <Text style={styles.text}>6708 TS Wageningen</Text>
                    <Text style={styles.text}>Netherlands</Text>
                    <View style={styles.break} />
                    <Text style={styles.text}>{contactInfo.phone}</Text>
                    <Text style={styles.text}>{contactInfo.email}</Text>
                    <Text style={styles.text}>www.erpmasterclasses.com</Text>
                    <View style={styles.break} />
                    <Text style={styles.text}>Bank NL77 RABO 0332 8954 91</Text>
                    <Text style={styles.text}>BIC RABONL2U</Text>
                    <Text style={styles.text}>Kvk {contactInfo.kvk}</Text>
                    <Text style={styles.text}>VAT {contactInfo.vatNumber}</Text>
                </View>
            </View>

            {/* Order Summary */}
            <View style={styles.divider} /> 
            <View style={styles.orderSummary}>
                <Text style={styles.title}>Order summary:</Text>
                <Text style={styles.text}>Event: {data.eventTitel}</Text>
                <Text style={styles.text}>Date: {data.eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text style={styles.text}>Language: {data.lang}</Text>
                <Text style={styles.text}>Total number of participants: {(data.additionalParticipants?.length ?? 0) + 1}</Text>
                <View style={styles.break} />
                <View style={styles.line} />
                <Text style={styles.text}>Subtotal: €{paymentDetails.subtotal / 100}</Text>
                <Text style={styles.text}>Tax: €{paymentDetails.tax / 100}</Text>
                {paymentDetails.discount > 0 && <Text style={styles.text}>Discount: €{paymentDetails.discount / 100}</Text>}
                <View style={styles.line} />
                <Text style={[styles.text, styles.bold]}>Total: €{paymentDetails.totalAmount / 100}</Text>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>Thank you for paying this invoice within 14 days</Text>
        </Page>
    </Document>
);