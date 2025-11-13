import { Link } from "react-router-dom";
import { useInvoiceIndex } from "./hooks/useInvoiceIndex";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceFilterForm from "./components/InvoiceFilterForm";
import SuccessDisplay from "../components/notification/SuccessDisplay";
import LoadingDisplay from "../components/layout/LoadingDisplay";
import StatisticsDisplay from "./components/StatisticsDisplay";
import { FilterIcon } from "../assets/icons/icons";

/**
 * Komponenta pro zobrazení hlavní stránky faktur.
 *
 * @component
 * @returns {JSX.Element} Hlavní stránka faktur.
 */
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
                        <button
                            type="button"
                            className="btn bg-primary"
                            onClick={toggleFilter}
                        >
                            <img src={FilterIcon} alt="Filtr" />
                        </button>
                    </div>
                </div>
            </div>
            {showFilter && (
                <InvoiceFilterForm
                    setInvoices={setInvoices}
                    setLoading={setInvoicesLoading}
                />
            )}
            <hr />
            {invoicesLoading ? (
                <LoadingDisplay />
            ) : (
                <InvoiceTable
                    items={invoices}
                    setItems={setInvoices}
                    setSuccess={setSentState}
                />
            )}
            <Link to={"/invoices/create"} className="btn bg-success">
                Nová Faktura
            </Link>
        </div>
    );
};

export default InvoiceIndex;
