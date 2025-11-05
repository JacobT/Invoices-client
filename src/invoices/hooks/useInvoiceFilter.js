import { useState, useEffect } from "react";
import { apiGet, ApiRequestError } from "../../utils/api";

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

    useEffect(() => {
        const getPeople = async () => {
            setPeople(await apiGet("/api/persons"));
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

    const applyFilter = async () => {
        try {
            const response = await apiGet("/api/invoices", filter);
            setInvoices(response);
        } catch (error) {
            if (
                error instanceof ApiRequestError &&
                error.response.status === 404
            ) {
                setInvoices([]);
            } else {
                throw error;
            }
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
