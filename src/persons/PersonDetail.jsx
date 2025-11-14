import { usePersonDetail } from "./hooks/usePersonDetail";
import { useParams } from "react-router-dom";
import { usePageMode } from "../hooks/usePageMode";
import PersonLayout from "./components/PersonLayout";
import InvoiceTable from "../invoices/components/InvoiceTable";
import LoadingDisplay from "../components/layout/LoadingDisplay";
import SuccessDisplay from "../components/notification/SuccessDisplay";

/**
 * Komponenta pro detail osoby.
 *
 * @component
 * @returns {JSX.Element} Zobrazení detailu osoby s možností úprav a seznamem faktur.
 */
const PersonDetail = () => {
    const { id } = useParams();
    const mode = usePageMode(id);

    const {
        person,
        personLoading,
        receivedInvoices,
        setReceivedInvoices,
        sentInvoices,
        setSentInvoices,
        invoicesLoading,
        deleteSuccess,
        setDeleteSuccess,
        handleChange,
        handleSubmit,
    } = usePersonDetail(mode, id);

    const layoutProps = { mode, person, handleChange };

    if (id && personLoading) return <LoadingDisplay />;

    return (
        <div>
            {deleteSuccess && (
                <SuccessDisplay
                    state={deleteSuccess}
                    setState={setDeleteSuccess}
                />
            )}
            {mode === "show" ? (
                <>
                    <PersonLayout {...layoutProps} />
                    <hr />
                    {invoicesLoading ? (
                        <LoadingDisplay />
                    ) : (
                        <>
                            {sentInvoices.length > 0 && (
                                <>
                                    <h3>Vydané faktury:</h3>
                                    <InvoiceTable
                                        items={sentInvoices}
                                        setItems={setSentInvoices}
                                        setSuccess={setDeleteSuccess}
                                    />
                                </>
                            )}
                            {receivedInvoices.length > 0 && (
                                <>
                                    <h3>Přijaté faktury:</h3>
                                    <InvoiceTable
                                        items={receivedInvoices}
                                        setItems={setReceivedInvoices}
                                        setSuccess={setDeleteSuccess}
                                    />
                                </>
                            )}
                        </>
                    )}
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <PersonLayout {...layoutProps} />
                </form>
            )}
        </div>
    );
};

export default PersonDetail;
