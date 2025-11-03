import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiRequestError, apiGet, apiPost, apiPut } from "../../utils/api";
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

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        const getPerson = async () => {
            if (id) {
                try {
                    setPerson(await apiGet("/api/persons/" + id));
                } catch (error) {
                    console.log(error.message);
                    setError(error.message);
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
                if (
                    error instanceof ApiRequestError &&
                    error.response.status === 404
                ) {
                    setter([]);
                } else {
                    console.log(error.message);
                    setError(error.message);
                }
            }
        };
        const id = person.identificationNumber;
        getInvoices(`/api/identification/${id}/purchases`, setReceivedInvoices);
        getInvoices(`/api/identification/${id}/sales`, setSentInvoices);
    }, [person, mode]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (mode === "edit"
            ? apiPut("/api/persons/" + id, person)
            : apiPost("/api/persons", person)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                // navigate("/persons");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
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
        sentState,
        successState,
        errorState,
        handleChange,
        handleSubmit,
    };
};
