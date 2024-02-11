import ReactPDF from "@react-pdf/renderer"
import { TestDocumentPDF } from "@/emails/test-invoice"

export const generateInvoicePDF = async () => {
    const readableStream = await ReactPDF.renderToStream(<TestDocumentPDF />);
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};
