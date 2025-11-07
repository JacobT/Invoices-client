import { Route } from "react-router-dom";
import InvoiceIndex from "../../../invoices/InvoiceIndex";
import InvoiceDetail from "../../../invoices/InvoiceDetail";

const invoiceRoutes = (
    <>
        <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceDetail />} />
            <Route path="edit/:id" element={<InvoiceDetail />} />
        </Route>
    </>
);

export default invoiceRoutes;
