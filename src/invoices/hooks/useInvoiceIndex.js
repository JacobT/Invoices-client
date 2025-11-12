import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSuccessState } from "../../hooks/useSuccessState";
import { useFilterToggle } from "./useFilterToggle";

/**
 * @typedef {Object} InvoiceIndexReturn
 * @property {Array<Object>} invoices - Seznam načtených faktur.
 * @property {Function} setInvoices - Funkce pro aktualizaci seznamu faktur.
 * @property {boolean} invoicesLoading - Stav načítání faktur.
 * @property {Function} setInvoicesLoading - Funkce pro nastavení stavu načítání faktur.
 * @property {Object} statistics - Statistické údaje o fakturách.
 * @property {string|number} statistics.currentYearSum - Souhrn příjmů za aktuální rok.
 * @property {string|number} statistics.allTimeSum - Celkový souhrn příjmů.
 * @property {string|number} statistics.invoicesCount - Celkový počet faktur.
 * @property {boolean} statisticsLoading - Stav načítání statistik.
 * @property {boolean} showFilter - Stav zobrazení filtru.
 * @property {Function} toggleFilter - Funkce pro přepínání viditelnosti filtru.
 * @property {{success: boolean, message: string}|null} sentState - Stav úspěšné akce.
 * @property {Function} setSentState - Funkce pro nastavení stavu úspěšné akce.
 */

/**
 * Custom hook pro správu hlavní stránky faktur.
 *
 * @hook
 * @returns {InvoiceIndexReturn} Objekt obsahující seznam faktur, statistiky, loading stavy a utility.
 */
export const useInvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [statistics, setStatistics] = useState({
        currentYearSum: "",
        allTimeSum: "",
        invoicesCount: "",
    });

    const { showFilter, toggleFilter } = useFilterToggle();
    const { handleErrors } = useErrorContext();
    const [sentState, setSentState] = useSuccessState("sent");
    const [invoicesLoading, setInvoicesLoading] = useState(true);
    const [statisticsLoading, setStatisticsLoading] = useState(true);

    /**
     * Načítá seznam faktur z API a nastavuje stav načítání.
     */
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

    /**
     * Načítá statistiky faktur z API při změně seznamu faktur.
     */
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
