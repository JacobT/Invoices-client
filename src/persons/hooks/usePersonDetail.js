import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { Country } from "../../utils/countryFormatter";
import { usePageMode } from "../../hooks/usePageMode";

export const usePersonDetail = (id) => {
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

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/persons/" + id).then((data) => setPerson(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id
            ? apiPut("/api/persons/" + id, person)
            : apiPost("/api/persons", person)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/persons");
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
        sentState,
        successState,
        errorState,
        handleChange,
        handleSubmit,
    };
};
