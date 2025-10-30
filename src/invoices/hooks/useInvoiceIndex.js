import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";

export const useInvoiceIndex = () => {
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

    return { invoices, invoiceStatistics, deleteInvoice };
};
