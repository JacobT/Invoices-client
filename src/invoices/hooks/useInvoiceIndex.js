import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSuccessState } from "../../hooks/useSuccessState";

export const useInvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [statistics, setStatistics] = useState({
        currentYearSum: "",
        allTimeSum: "",
        invoicesCount: "",
    });

    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => setShowFilter(!showFilter);
    const { handleErrors } = useErrorContext();
    const [sentState, setSentState] = useSuccessState("sent");
    const [invoicesLoading, setInvoicesLoading] = useState(true);
    const [statisticsLoading, setStatisticsLoading] = useState(true);

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await apiGet("/api/invoices");
                setInvoices(response);
            } catch (error) {
                handleErrors("Chyba při načítání faktur", error);
            } finally {
                setInvoicesLoading(false);
            }
        };
        getInvoices();
    }, []);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const response = await apiGet("/api/invoices/statistics");
                setStatistics(response);
            } catch (error) {
                handleErrors("Chyba při načítání statistik", error);
            } finally {
                setStatisticsLoading(false);
            }
        };
        getStatistics();
    }, [invoices]);

    return {
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
    };
};
