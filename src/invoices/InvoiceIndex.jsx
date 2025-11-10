import { Link } from "react-router-dom";
import { useInvoiceIndex } from "./hooks/useInvoiceIndex";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceFilter from "./components/InvoiceFilter";
import SuccessDisplay from "../components/notification/SuccessDisplay";

const InvoiceIndex = () => {
    const {
        invoices,
        setInvoices,
        invoiceStatistics,
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
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <p className="mb-0">
                            <strong>Celkový počet faktur: </strong>
                            {invoiceStatistics.invoicesCount}
                        </p>
                    </div>
                    <div className="col">
                        <p className="mb-0">
                            <strong>Souhrn příjmů za tento rok: </strong>
                            {invoiceStatistics.currentYearSum}
                        </p>
                    </div>
                    <div className="col">
                        <p className="mb-0">
                            <strong>Celkový souhrn příjmů: </strong>
                            {invoiceStatistics.allTimeSum}
                        </p>
                    </div>
                </div>
            </div>
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
            <InvoiceFilter showFilter={showFilter} setInvoices={setInvoices} />
            <hr />
            <InvoiceTable
                items={invoices}
                setItems={setInvoices}
                apiPath={"/api/invoices/"}
            />
            <hr />
            <Link to={"/invoices/create"} className="btn bg-success">
                Nová Faktura
            </Link>
        </div>
    );
};

export default InvoiceIndex;
