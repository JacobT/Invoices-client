import FlashMessage from "../components/FlashMessage";
import { usePersonDetail } from "./hooks/usePersonDetail";
import { useParams } from "react-router-dom";
import { usePageMode } from "../hooks/usePageMode";
import PersonLayout from "./components/PersonLayout";
import InvoiceTable from "../invoices/components/InvoiceTable";

const PersonDetail = () => {
    const { id } = useParams();
    const mode = usePageMode(id);

    const {
        person,
        receivedInvoices,
        setReceivedInvoices,
        sentInvoices,
        setSentInvoices,
        sentState,
        successState,
        errorState,
        handleChange,
        handleSubmit,
    } = usePersonDetail(mode, id);

    const layoutProps = { mode, person, handleChange };

    const recievedInvoicesProps = {
        items: receivedInvoices,
        setItems: setReceivedInvoices,
        apiPath: "/api/invoices/",
    };
    const sentInvoicesProps = {
        items: sentInvoices,
        setItems: setSentInvoices,
        apiPath: "/api/invoices/",
    };

    return (
        <div>
            {errorState && <FlashMessage theme="danger" text={errorState} />}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={
                        successState
                            ? "Uložení osobnosti proběhlo úspěšně."
                            : ""
                    }
                />
            )}

            {mode === "show" ? (
                <>
                    <PersonLayout {...layoutProps} />
                    {sentInvoices.length > 0 && (
                        <>
                            <h3>Vydané faktury:</h3>
                            <InvoiceTable {...sentInvoicesProps} />
                        </>
                    )}
                    {receivedInvoices.length > 0 && (
                        <>
                            <h3>Přijaté faktury:</h3>
                            <InvoiceTable {...recievedInvoicesProps} />
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
