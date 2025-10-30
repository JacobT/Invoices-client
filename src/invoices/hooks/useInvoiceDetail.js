import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const useInvoiceDetail = (id) => {
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: new Date().toISOString(),
        dueDate: new Date().toISOString(),
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

    useEffect(() => {
        if (id) {
            const getInvoice = async () => {
                const invoice = await apiGet("/api/invoices/" + id);
                setInvoice(invoice);
            };
            getInvoice();
        }
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            const data = await apiGet("/api/persons");
            setPeople(data);
        };
        getData();
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

        if (id) {
            await apiPut("/api/invoices/" + id, invoice);
        } else {
            await apiPost("/api/invoices", invoice);
        }

        navigate("/invoices");
    };

    return { invoice, people, handleChange, handleSubmit };
};
