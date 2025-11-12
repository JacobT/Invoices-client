import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";

/**
 * @typedef {Object} InvoiceFilterReturn
 * @property {Object} filter - Aktuální stav filtru faktur.
 * @property {string} filter.invoiceNumber - Filtrovat podle čísla faktury.
 * @property {string} filter.fromDate - Filtrovat od data vydání.
 * @property {string} filter.toDate - Filtrovat do data vydání.
 * @property {string} filter.fromPrice - Filtrovat od ceny.
 * @property {string} filter.toPrice - Filtrovat do ceny.
 * @property {string} filter.buyerId - Filtrovat podle odběratele (ID).
 * @property {string} filter.sellerId - Filtrovat podle dodavatele (ID).
 * @property {string} filter.limit - Limit počtu výsledků.
 * @property {Array<Object>} people - Seznam osob pro selecty.
 * @property {(e: Event) => void} handleChange - Funkce pro aktualizaci filtru při změně inputu/selectu.
 * @property {() => void} resetFilter - Funkce pro reset filtru na výchozí hodnoty.
 * @property {(e: Event) => Promise<void>} applyFilter - Funkce pro aplikaci filtru a načtení faktur.
 */

/**
 * Custom hook pro správu filtru faktur.
 * Umožňuje spravovat stav filtru, seznam osob a poskytuje utility pro aplikaci a reset filtru.
 *
 * @hook
 * @param {Function} setInvoices - Funkce pro nastavení seznamu faktur po aplikaci filtru.
 * @param {Function} setLoading - Funkce pro nastavení loading stavu při načítání faktur.
 * @returns {InvoiceFilterReturn} Objekt obsahující stav filtru, seznam osob a utility funkce.
 */
export const useInvoiceFilter = (setInvoices, setLoading) => {
    const [filter, setFilter] = useState({
        invoiceNumber: "",
        fromDate: "",
        toDate: "",
        fromPrice: "",
        toPrice: "",
        buyerId: "",
        sellerId: "",
        limit: "",
    });

    const [people, setPeople] = useState([]);
    const { handleErrors, clearErrors } = useErrorContext();

    /**
     * Načítá seznam osob z API.
     */
    useEffect(() => {
        const getPeople = async () => {
            try {
                setPeople(await apiGet("/api/persons"));
            } catch (error) {
                handleErrors("Chyba při načítání osob", error);
            }
        };
        getPeople();
    }, []);

    /**
     * Aktualizuje hodnotu filtru podle změny inputu nebo selectu.
     *
     * @param {Event} e - Event z inputu nebo selectu.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Resetuje filtr na výchozí hodnoty.
     */
    const resetFilter = () => {
        setFilter({
            invoiceNumber: "",
            fromDate: "",
            toDate: "",
            fromPrice: "",
            toPrice: "",
            buyerId: "",
            sellerId: "",
            limit: "",
        });
    };

    /**
     * Aplikuje filtr a načte faktury podle aktuálního stavu filtru.
     *
     * @param {Event} e - Submit event formuláře filtru.
     */
    const applyFilter = async (e) => {
        e.preventDefault();

        clearErrors();
        setLoading(true);
        try {
            const response = await apiGet("/api/invoices", filter);
            setInvoices(response);
        } catch (error) {
            handleErrors("Chyba při načítání faktur", error, () =>
                setInvoices([])
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        filter,
        people,
        handleChange,
        resetFilter,
        applyFilter,
    };
};
