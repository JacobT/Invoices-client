import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceStatistics, setInvoiceStatistics] = useState({
        currentYearSum: "",
        allTimeSum: "",
        invoicesCount: "",
    });

    useEffect(() => {
        const getInvoices = async () => {
            const response = await apiGet("/api/invoices");
            setInvoices(response);
        };
        getInvoices();
    }, []);

    useEffect(() => {
        const getStatistics = async () => {
            const response = await apiGet("/api/invoices/statistics");
            setInvoiceStatistics(response);
        };
        getStatistics();
    }, []);

    const deleteInvoice = async (id) => {
        await apiDelete("/api/invoices/" + id);
        setInvoices(invoices.filter((invoice) => invoice._id != id));
    };

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
