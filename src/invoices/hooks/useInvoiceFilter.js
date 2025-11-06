import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";

export const useInvoiceFilter = (setInvoices) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

    const applyFilter = async (e) => {
        e.preventDefault();

        clearErrors();
        try {
            const response = await apiGet("/api/invoices", filter);
            setInvoices(response);
        } catch (error) {
            handleErrors("Chyba při načítání faktur", error, () =>
                setInvoices([])
            );
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
