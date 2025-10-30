import { Link } from "react-router-dom";
import { useInvoiceIndex } from "./hooks/useInvoiceIndex";
import InvoiceTable from "./components/InvoiceTable";

const InvoiceIndex = () => {
    const { invoices, invoiceStatistics, deleteInvoice } = useInvoiceIndex();

    return (
        <div className="pb-5">
            <h1>Seznam faktur</h1>
            <div className="row text-center">
                <div className="col">
                    <p>
                        Celkový počet faktur: {invoiceStatistics.invoicesCount}
                    </p>
                </div>
                <div className="col">
                    <p>
                        Souhrn příjmů za tento rok:{" "}
                        {invoiceStatistics.currentYearSum}
                    </p>
                </div>
                <div className="col">
                    <p>Celkový souhrn příjmů: {invoiceStatistics.allTimeSum}</p>
                </div>
            </div>
            <hr />
            <p>Počet faktur: {invoices.length}</p>
            <hr />
            <InvoiceTable items={invoices} deleteInvoice={deleteInvoice} />
            <hr />
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová Faktura
            </Link>
        </div>
    );
};

export default InvoiceIndex;
