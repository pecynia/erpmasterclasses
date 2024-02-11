import React from 'react';
import { Page, Text, View, Document, StyleSheet, } from '@react-pdf/renderer';
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


export const TestDocumentPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Registration Invoice</Text>
                <Text style={styles.title}>Invoice for Nicolai</Text>
                <Text style={styles.text}>Company: Dynamics and More</Text>
                <Text style={styles.footer}>ERP Masterclass</Text>
            </View>
        </Page>
    </Document>
)
