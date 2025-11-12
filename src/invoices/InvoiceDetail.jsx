import { useParams } from "react-router-dom";
import { usePageMode } from "../hooks/usePageMode";
import { useInvoiceDetail } from "./hooks/useInvoiceDetail";
import InvoiceLayout from "./components/InvoiceLayout";
import LoadingDisplay from "../components/layout/LoadingDisplay";

/**
 * Komponenta pro zobrazení detailu faktury.
 *
 * @returns {JSX.Element} Kontejner s detailem faktury, formulářem pro úpravu/vytvoření.
 */
const InvoiceDetail = () => {
    const { id } = useParams();
    const mode = usePageMode(id);
    const { invoice, people, isLoading, handleChange, handleSubmit } =
        useInvoiceDetail(id);
    const layoutProps = { mode, invoice, people, handleChange };

    return (
        <>
            {isLoading ? (
                <LoadingDisplay />
            ) : (
                <>
                    {mode === "show" ? (
                        <InvoiceLayout {...layoutProps} />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <InvoiceLayout {...layoutProps} />
                        </form>
                    )}
                </>
            )}
        </>
    );
};

export default InvoiceDetail;
