import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { RegistrationFormProps } from '@/../../../../typings';
import { PaymentDetails } from '@/app/_actions';
import { contactInfo } from '@/dictionaries/contactInfo';
import { countries, languages } from 'country-data'

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
        fontSize: 3,
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
        textAlign: 'left',
    },
    participantsList: {
        marginTop: 10,
    },
    participantItem: {
        fontSize: 10,
        marginBottom: 2,
    },
    boldText: {
        fontSize: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    orderSummaryLeft: {
        marginTop: 20,
        paddingTop: 10,
        borderTop: '1px solid #ddd',
        width: '50%',
        fontSize: 10,
    },
    orderSummaryRight: {
        marginTop: 20,
        paddingTop: 10,
        borderTop: '1px solid #ddd',
        width: '50%',
        fontSize: 10,
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
            <Text style={styles.date}>Wageningen, {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>

            {/* Billing and Company Info */}
            <View style={styles.section}>

                {/* Customer Details */}
                <View style={styles.leftColumn}>
                    <Text style={styles.boldText}>Billed to:</Text>
                    <Text style={styles.text}>{data.companyName}</Text>
                    <Text style={styles.text}>{data.nameParticipant}</Text>
                    <Text style={styles.text}>{paymentDetails.customer_details.address.line1}</Text>
                    {paymentDetails.customer_details.address.line2 && <Text style={styles.text}>{paymentDetails.customer_details.address.line2}</Text>}
                    <Text style={styles.text}>{paymentDetails.customer_details.address.postal_code} {paymentDetails.customer_details.address.city}</Text>
                    <Text style={styles.text}>{countries[paymentDetails.customer_details.address.country].name}</Text>
                </View>

                {/* Seller Details */}
                <View style={styles.rightColumn}>
                    <Text style={styles.title}>TerDege Advies & Training B.V.</Text>
                    <Text style={styles.text}>Pad van Witte Veder 13</Text>
                    <Text style={styles.text}>6708 TS Wageningen</Text>
                    <Text style={styles.text}>Netherlands</Text>
                    <View style={styles.break} />
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
            <View style={styles.section}>
                <View style={styles.orderSummaryLeft}>
                    <Text style={styles.title}>Order summary:</Text>
                    {data.poNumber && <Text style={styles.text}>PO: {data.poNumber}</Text>}
                    <Text style={styles.text}>Name: {data.nameParticipant}</Text>
                    <Text style={styles.text}>Event: {data.eventTitel}</Text>
                    <Text style={styles.text}>Date: {data.eventDate.toLocaleDateString(data.lang, { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text style={styles.text}>
                        Language: {
                            (() => {
                                const languageCode = data.selectedEvent.language.toUpperCase()
                                const languageObject = languages.all.find(lang => lang.alpha2 === languageCode)
                                return languageObject ? languageObject.name : data.selectedEvent.language.toUpperCase()
                            })()
                        }
                    </Text>
                    <Text style={styles.text}>{data.selectedEvent.location ? `Address: ${data.selectedEvent.location}` : 'Location: Online'}
                    </Text>
                    {/* Listing all participants */}
                    {data.additionalParticipants && data.additionalParticipants.length > 0 && (
                        <View style={styles.participantsList}>
                            <Text style={styles.boldText}>Additional Participants:</Text>
                            {data.additionalParticipants.map((participant, index) => (
                                <Text key={index} style={styles.participantItem}>
                                    {index + 1}. {participant.nameParticipant}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>

                {/* Payment Details */}
                <View style={styles.orderSummaryRight}>
                    <Text style={styles.title}>Payment details:</Text>
                    <Text style={styles.text}>Subtotal: € {(paymentDetails.subtotal / 100).toFixed(2)}</Text>
                    <Text style={styles.text}>Tax: € {(paymentDetails.tax / 100).toFixed(2)}</Text>
                    {paymentDetails.discount > 0 && <Text style={styles.text}>Discount: € {(paymentDetails.discount / 100).toFixed(2)}</Text>}
                    <View style={styles.break} />
                    <Text style={styles.boldText}>Total: € {(paymentDetails.totalAmount / 100).toFixed(2)}</Text>
                </View>
            </View>
        </Page>
    </Document>
);