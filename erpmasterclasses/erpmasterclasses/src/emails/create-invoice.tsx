import React from 'react';
import { Page, Text, View, Document, StyleSheet, } from '@react-pdf/renderer';
import { RegistrationFormProps } from '@/../../../../typings';
import { PaymentDetails } from '@/app/_actions';
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    logo: {
        width: 200,
        height: 100,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 10,
    },
    strong: {
        fontWeight: 'bold',
    },
    participant: {
        marginTop: 10,
        padding: 10,
        border: '1px solid #ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    footer: {
        marginTop: 20,
        paddingTop: 10,
        borderTop: '1px solid #ddd',
        fontSize: 10,
        color: '#666',
    },
});


export const DocumentPDF = ({ data, paymentDetails }: { data: RegistrationFormProps, paymentDetails: PaymentDetails }) => (
    <PDFViewer>
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Registration Invoice</Text>
                <Text style={styles.title}>Thank you for your registration to the event {data.eventTitel}</Text>
                {/* <Text style={styles.text}>Event Date: {data.eventDate?.toLocaleDateString(data.lang, { year: 'numeric', month: 'long', day: 'numeric' })}</Text> */}
                <Text style={styles.text}>Company Name: {data.companyName}</Text>
                <Text style={styles.text}>Address: {data.address}</Text>
                <Text style={styles.text}>Country: {data.country}</Text>
                <Text style={styles.text}>Name: {data.nameParticipant}</Text>
                <Text style={styles.text}>Phone: {data.phone}</Text>
                <Text style={styles.text}>Email: {data.email}</Text>
                <Text style={styles.text}>Position: {data.position}</Text>
                <Text style={styles.text}>VAT number: {data.vatNumber}</Text>
                <Text style={styles.text}>PO number: {data.poNumber}</Text>
                {/* <View style={styles.participant}>
                    <Text style={styles.strong}>Additional Participants:</Text>
                    {data.additionalParticipants?.map((participant, index) => (
                        <View key={index}>
                            <Text style={styles.text}>Name: {participant.nameParticipant}</Text>
                            <Text style={styles.text}>Email: {participant.email}</Text>
                            <Text style={styles.text}>Position: {participant.position}</Text>
                        </View>
                    ))}
                </View> */}
                <Text style={styles.text}>Subtotal: {paymentDetails.subtotal / 100}</Text>
                <Text style={styles.text}>Total Amount: {paymentDetails.totalAmount / 100}</Text>
                <Text style={styles.text}>Discount: {paymentDetails.discount / 100}</Text>
                <Text style={styles.text}>Tax: {paymentDetails.tax / 100}</Text>
                <Text style={styles.footer}>ERP Masterclass</Text>
            </View>
        </Page>
    </Document>
    </PDFViewer>
)
