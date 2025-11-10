import { Link } from "react-router-dom";
import { useInvoiceIndex } from "./hooks/useInvoiceIndex";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceFilter from "./components/InvoiceFilter";
import SuccessDisplay from "../components/notification/SuccessDisplay";
import LoadingDisplay from "../components/layout/LoadingDisplay";
import StatisticsDisplay from "./components/StatisticsDisplay";

const InvoiceIndex = () => {
    const {
        invoices,
        setInvoices,
        invoicesLoading,
        setInvoicesLoading,
        statistics,
        statisticsLoading,
        showFilter,
        toggleFilter,
        sentState,
        setSentState,
    } = useInvoiceIndex();

    return (
        <div>
            {sentState && (
                <SuccessDisplay state={sentState} setState={setSentState} />
            )}
            <h1>Seznam faktur</h1>
            <hr />
            {statisticsLoading ? (
                <LoadingDisplay />
            ) : (
                <StatisticsDisplay statistics={statistics} />
            )}
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <p className="m-0">
                            Počet nalezených faktur: {invoices.length}
                        </p>
                    </div>
                    <div className="col text-end">
                        <input
                            type="button"
                            className="btn bg-primary"
                            value="Filtr"
                            onClick={toggleFilter}
                        />
                    </div>
                </div>
            </div>
            <InvoiceFilter
                showFilter={showFilter}
                setInvoices={setInvoices}
                setLoading={setInvoicesLoading}
            />
            <hr />
            {invoicesLoading ? (
                <LoadingDisplay />
            ) : (
                <InvoiceTable
                    items={invoices}
                    setItems={setInvoices}
                    apiPath={"/api/invoices/"}
                />
            )}
            <Link to={"/invoices/create"} className="btn bg-success">
                Nová Faktura
            </Link>
        </div>
    );
};

export default InvoiceIndex;
