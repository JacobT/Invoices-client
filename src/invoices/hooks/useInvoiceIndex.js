import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";

export const useInvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceStatistics, setInvoiceStatistics] = useState({
        currentYearSum: "",
        allTimeSum: "",
        invoicesCount: "",
    });

    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => setShowFilter(!showFilter);

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
    }, [invoices]);

    return {
        invoices,
        setInvoices,
        invoiceStatistics,
        showFilter,
        toggleFilter,
    };
};
