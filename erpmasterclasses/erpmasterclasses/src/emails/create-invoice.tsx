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
    },
    rightColumn: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '50%',
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
    bold: {
        fontWeight: 'bold',
    },
    orderSummary: {
        marginTop: 20,
        borderTop: '1px solid #ddd',
        paddingTop: 10,
    },
    line: {
        borderBottom: '1px solid #ddd',
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 40,
        right: 40,
        borderTop: '1px solid #ddd',
        paddingTop: 10,
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
});

// DocumentPDF Component
export const DocumentPDF = ({ data, paymentDetails }: { data: RegistrationFormProps, paymentDetails: PaymentDetails }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <Text style={styles.header}>ERP Masterclasses</Text>

            {/* Billing and Company Info */}
            <View style={styles.section}>
                <View style={styles.leftColumn}>
                    <Text style={[styles.text, styles.bold]}>Billed to:</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.city}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.country}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.line1}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.postal_code}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.email}</Text>
                    <Text style={styles.text}>{data.nameParticipant}</Text>
                    <Text style={styles.text}>{data.phone}</Text>
                    <Text style={styles.text}>{data.companyName}</Text>
                    <Text style={styles.text}>{data.position}</Text>
                    <Text style={styles.text}>{data.vatNumber}</Text>
                    {data.poNumber && <Text style={styles.text}>{data.poNumber}</Text>}
                </View>

                <View style={styles.rightColumn}>
                    <Text style={styles.title}>Dynamics and More</Text>
                    <Text style={styles.text}>{contactInfo.address}</Text>
                    <Text style={styles.text}>{contactInfo.email}</Text>
                    <Text style={styles.text}>{contactInfo.phone}</Text>
                    <Text style={styles.text}>KVK: {contactInfo.kvk}</Text>
                    <Text style={styles.text}>VAT: {contactInfo.vatNumber}</Text>
                </View>
            </View>

            {/* Order Summary */}
            <View style={styles.orderSummary}>
                <Text style={styles.title}>Order summary:</Text>
                <View style={styles.line} />
                <Text style={styles.text}>Event: {data.eventTitel}</Text>
                <View style={styles.line} />
                <Text style={styles.text}>Subtotal: €{paymentDetails.subtotal / 100}</Text>
                <Text style={styles.text}>Tax: €{paymentDetails.tax / 100}</Text>
                {paymentDetails.discount > 0 && <Text style={styles.text}>Discount: €{paymentDetails.discount / 100}</Text>}
                <View style={styles.line} />
                <Text style={[styles.text, styles.bold]}>Total: €{paymentDetails.totalAmount / 100}</Text>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>ERP Masterclasses</Text>
        </Page>
    </Document>
);