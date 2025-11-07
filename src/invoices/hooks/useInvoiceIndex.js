import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSuccessState } from "../../hooks/useSuccessState";

export const useInvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceStatistics, setInvoiceStatistics] = useState({
        currentYearSum: "",
        allTimeSum: "",
        invoicesCount: "",
    });

    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => setShowFilter(!showFilter);
    const { handleErrors } = useErrorContext();
    const [sentState, setSentState] = useSuccessState("sent");

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await apiGet("/api/invoices");
                setInvoices(response);
            } catch (error) {
                handleErrors("Chyba při načítání faktur", error);
            }
        };
        getInvoices();
    }, []);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const response = await apiGet("/api/invoices/statistics");
                setInvoiceStatistics(response);
            } catch (error) {
                handleErrors("Chyba při načítání statistik", error);
            }
        };
        getStatistics();
    }, [invoices]);

    return {
        invoices,
        setInvoices,
        invoiceStatistics,
        showFilter,
        toggleFilter,
        sentState,
        setSentState,
    };
};
