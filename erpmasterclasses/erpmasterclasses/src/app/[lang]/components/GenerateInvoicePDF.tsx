import ReactPDF from "@react-pdf/renderer"
import { DocumentPDF } from "@/emails/create-invoice"
import { RegistrationFormProps } from '@/../../../../typings';
import { PaymentDetails } from '@/app/_actions';

export const generateInvoicePDF = async (data: RegistrationFormProps, paymentDetails: PaymentDetails) => {
    const readableStream = await ReactPDF.renderToStream(<DocumentPDF data={data} paymentDetails={paymentDetails} />)
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};
