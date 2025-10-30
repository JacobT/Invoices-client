import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import { Country } from "../utils/countryFormatter";

const PersonForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} osobnost</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení osobnosti proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="name"
                    min="3"
                    label="Jméno"
                    prompt="Zadejte celé jméno"
                    value={person.name}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="identificationNumber"
                    min="3"
                    label="IČO"
                    prompt="Zadejte IČO"
                    value={person.identificationNumber}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="taxNumber"
                    min="3"
                    label="DIČ"
                    prompt="Zadejte DIČ"
                    value={person.taxNumber}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="accountNumber"
                    min="3"
                    label="Číslo bankovního účtu"
                    prompt="Zadejte číslo bankovního účtu"
                    value={person.accountNumber}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="bankCode"
                    min="3"
                    label="Kód banky"
                    prompt="Zadejte kód banky"
                    value={person.bankCode}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="IBAN"
                    min="3"
                    label="IBAN"
                    prompt="Zadejte IBAN"
                    value={person.iban}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="telephone"
                    min="3"
                    label="Telefon"
                    prompt="Zadejte Telefon"
                    value={person.telephone}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="mail"
                    min="3"
                    label="Mail"
                    prompt="Zadejte mail"
                    value={person.mail}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="street"
                    min="3"
                    label="Ulice"
                    prompt="Zadejte ulici"
                    value={person.street}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="ZIP"
                    min="3"
                    label="PSČ"
                    prompt="Zadejte PSČ"
                    value={person.zip}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="city"
                    min="3"
                    label="Město"
                    prompt="Zadejte město"
                    value={person.city}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={person.note}
                    handleChange={handleChange}
                />

                <h6>Země:</h6>

                <InputCheck
                    type="radio"
                    name="country"
                    label="Česká republika"
                    value={Country.CZECHIA}
                    handleChange={handleChange}
                    checked={Country.CZECHIA === person.country}
                />

                <InputCheck
                    type="radio"
                    name="country"
                    label="Slovensko"
                    value={Country.SLOVAKIA}
                    handleChange={handleChange}
                    checked={Country.SLOVAKIA === person.country}
                />

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Uložit"
                />
            </form>
        </div>
    );
};

export default PersonForm;
