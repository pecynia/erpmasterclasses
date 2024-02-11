
import ReactPDF from "@react-pdf/renderer"
import { TestDocumentPDF } from "@/emails/test-invoice"
import PdfTestEmailClientComponent from "./PdfTestEmailClientComponent"
import { generateInvoicePDF } from "./GenerateInvoicePDF"

const PdfTester = async () => {
    const buffer = await generateInvoicePDF()

    return (
        <div>
            <PdfTestEmailClientComponent buffer={buffer} />
        </div>
    )
}

export default PdfTester

