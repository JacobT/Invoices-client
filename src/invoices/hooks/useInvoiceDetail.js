import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../contexts/ErrorContext";
import { createSuccessState } from "../../utils/createSuccessState";

export const useInvoiceDetail = (id) => {
    const navigate = useNavigate();

    const issued = new Date();
    const dueDate = new Date();
    dueDate.setDate(issued.getDate() + 30);
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: issued.toISOString(),
        dueDate: dueDate.toISOString(),
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: {
            _id: "",
        },
        seller: {
            _id: "",
        },
    });

    const [people, setPeople] = useState([]);
    const { handleErrors, clearErrors } = useErrorContext();
    const [invoiceLoading, setInvoiceLoading] = useState(true);
    const [peopleLoading, setPeopleLoading] = useState(true);

    useEffect(() => {
        const getInvoice = async () => {
            if (id) {
                try {
                    setInvoice(await apiGet("/api/invoices/" + id));
                } catch (error) {
                    handleErrors("Chyba při načítání faktury", error);
                }
            }
            setInvoiceLoading(false);
        };
        getInvoice();
    }, [id]);

    useEffect(() => {
        const getPeople = async () => {
            try {
                setPeople(await apiGet("/api/persons"));
            } catch (error) {
                handleErrors("Chyba při načítání osob", error);
            } finally {
                setPeopleLoading(false);
            }
        };
        getPeople();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "buyer" || name === "seller") {
            const selectedPerson = people.find((p) => p._id == value);
            setInvoice((prev) => ({
                ...prev,
                [name]: selectedPerson || {},
            }));
            return;
        }

        setInvoice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        clearErrors();
        try {
            if (id) {
                await apiPut("/api/invoices/" + id, invoice);
            } else {
                await apiPost("/api/invoices", invoice);
            }
        } catch (error) {
            handleErrors("Chyba při ukládání faktury", error);
        }

        navigate("/invoices", {
            state: createSuccessState("sent", "Faktura byla úspěšně uložena."),
        });
    };

    return {
        invoice,
        people,
        isLoading: invoiceLoading && peopleLoading,
        handleChange,
        handleSubmit,
    };
};
