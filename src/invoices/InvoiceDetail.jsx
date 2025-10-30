import { usePageMode } from "../hooks/usePageMode";
import { useInvoiceDetail } from "./hooks/useInvoiceDetail";
import InvoiceLayout from "./components/InvoiceLayout";
import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
    const { id } = useParams();
    const mode = usePageMode(id);
    const { invoice, people, handleChange, handleSubmit } =
        useInvoiceDetail(id);
    const layoutProps = { mode, invoice, people, handleChange };

    return (
        <>
            {mode === "show" ? (
                <InvoiceLayout {...layoutProps} />
            ) : (
                <form onSubmit={handleSubmit}>
                    <InvoiceLayout {...layoutProps} />
                </form>
            )}
        </>
    );
};

export default InvoiceDetail;
