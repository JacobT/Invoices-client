import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleErrors } from "../../hooks/useHandleErrors";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { Country } from "../../utils/countryFormatter";

export const usePersonDetail = (mode, id) => {
    const navigate = useNavigate();

    const [person, setPerson] = useState({
        name: "",
        identificationNumber: "",
        taxNumber: "",
        accountNumber: "",
        bankCode: "",
        iban: "",
        telephone: "",
        mail: "",
        street: "",
        zip: "",
        city: "",
        country: Country.CZECHIA,
        note: "",
    });
    const [receivedInvoices, setReceivedInvoices] = useState([]);
    const [sentInvoices, setSentInvoices] = useState([]);

    const { errorsState, handleErrors, clearErrors } = useHandleErrors();

    useEffect(() => {
        const getPerson = async () => {
            if (id) {
                try {
                    setPerson(await apiGet("/api/persons/" + id));
                } catch (error) {
                    handleErrors("Chyba při načítání osoby", error);
                }
            }
        };
        getPerson();
    }, [id]);

    useEffect(() => {
        if (mode !== "show" || !person?.identificationNumber) return;

        const getInvoices = async (url, setter) => {
            try {
                setter(await apiGet(url));
            } catch (error) {
                handleErrors("Chyba při načítání faktur", error, () =>
                    setter([])
                );
            }
        };

        const identificationNumber = person.identificationNumber;
        getInvoices(
            `/api/identification/${identificationNumber}/purchases`,
            setReceivedInvoices
        );
        getInvoices(
            `/api/identification/${identificationNumber}/sales`,
            setSentInvoices
        );
    }, [person.identificationNumber, mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        clearErrors();
        try {
            if (mode === "edit") {
                await apiPut("/api/persons/" + id, person);
            } else {
                await apiPost("/api/persons", person);
            }

            navigate("/persons"); //TODO send success state
        } catch (error) {
            handleErrors("Chyba při ukládání osoby", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        person,
        receivedInvoices,
        setReceivedInvoices,
        sentInvoices,
        setSentInvoices,
        errorsState,
        handleChange,
        handleSubmit,
    };
};
