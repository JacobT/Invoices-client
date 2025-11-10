import { usePersonDetail } from "./hooks/usePersonDetail";
import { useParams } from "react-router-dom";
import { usePageMode } from "../hooks/usePageMode";
import PersonLayout from "./components/PersonLayout";
import InvoiceTable from "../invoices/components/InvoiceTable";
import LoadingDisplay from "../components/layout/LoadingDisplay";

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
        handleChange,
        handleSubmit,
    } = usePersonDetail(mode, id);

    const layoutProps = { mode, person, handleChange };

    if (id && personLoading) return <LoadingDisplay />;

    return (
        <div>
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
                                    />
                                </>
                            )}
                            {receivedInvoices.length > 0 && (
                                <>
                                    <h3>Přijaté faktury:</h3>
                                    <InvoiceTable
                                        items={receivedInvoices}
                                        setItems={setReceivedInvoices}
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
