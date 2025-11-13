import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { Country } from "../../utils/countryFormatter";
import { useErrorContext } from "../../contexts/ErrorContext";
import { createSuccessState } from "../../utils/createSuccessState";

/**
 * @typedef {Object} Person
 * @property {string} [name]
 * @property {string} [identificationNumber]
 * @property {string} [taxNumber]
 * @property {string} [accountNumber]
 * @property {string} [bankCode]
 * @property {string} [iban]
 * @property {string} [telephone]
 * @property {string} [mail]
 * @property {string} [street]
 * @property {string} [zip]
 * @property {string} [city]
 * @property {string} [country]
 * @property {string} [note]
 */

/**
 * @typedef {Object} PersonDetailReturn
 * @property {Person} person - Aktuální stav osoby.
 * @property {boolean} personLoading - Indikátor načítání osoby.
 * @property {Array<Object>} receivedInvoices - Faktury, které osoba obdržela.
 * @property {Function} setReceivedInvoices - Funkce pro nastavení přijatých faktur.
 * @property {Array<Object>} sentInvoices - Faktury, které osoba vystavila.
 * @property {Function} setSentInvoices - Funkce pro nastavení vystavených faktur.
 * @property {boolean} invoicesLoading - Indikátor načítání faktur.
 * @property {{successMessage: string}|null} deleteSuccess - Stav úspěšné akce.
 * @property {Function} setDeleteSuccess - Funkce pro nastavení stavu úspěšné akce.
 * @property {(e: Event) => void} handleChange - Funkce pro aktualizaci hodnot osoby.
 * @property {(e: Event) => Promise<void>} handleSubmit - Funkce pro odeslání formuláře osoby.
 */

/**
 * Custom hook pro detail osoby a její faktury.
 * Načítá osobu a její přijaté/vystavené faktury, poskytuje utility pro změnu polí a odeslání.
 *
 * @hook
 * @param {"show"|"edit"|"create"} mode - Režim zobrazení nebo úpravy osoby.
 * @param {string|null} [id] - ID osoby pro režim show/edit.
 * @returns {PersonDetailReturn} Stav osoby, faktur a utility funkce.
 */
export const usePersonDetail = (mode, id) => {
    const navigate = useNavigate();

    let initialPerson = useRef(null);
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

    const { handleErrors, clearErrors } = useErrorContext();
    const [deleteSuccess, setDeleteSuccess] = useState();

    const [personLoading, setPersonLoading] = useState(true);
    const [receivedInvoicesLoading, setRecievedInvoicesLoading] =
        useState(true);
    const [sentInvoicesLoading, setsentInvoicesLoading] = useState(true);

    /**
     * Načte osobu podle ID.
     */
    useEffect(() => {
        const getPerson = async () => {
            if (id) {
                try {
                    const person = await apiGet("/api/persons/" + id);
                    setPerson(person);
                    initialPerson.current = person;
                } catch (error) {
                    handleErrors("Chyba při načítání osoby", error);
                }
            }
            setPersonLoading(false);
        };
        getPerson();
    }, [id]);

    /**
     * Načte faktury osoby v režimu "show".
     */
    useEffect(() => {
        if (mode !== "show") return;

        if (!person?.identificationNumber) {
            setRecievedInvoicesLoading(false);
            setsentInvoicesLoading(false);
            return;
        }

        const getInvoices = async (url, setter, setLoading) => {
            try {
                setter(await apiGet(url));
            } catch (error) {
                handleErrors("Chyba při načítání faktur", error, () => {
                    setter([]);
                });
            } finally {
                setLoading(false);
            }
        };

        const identificationNumber = person.identificationNumber;
        getInvoices(
            `/api/identification/${identificationNumber}/purchases`,
            setReceivedInvoices,
            setRecievedInvoicesLoading
        );
        getInvoices(
            `/api/identification/${identificationNumber}/sales`,
            setSentInvoices,
            setsentInvoicesLoading
        );
    }, [person.identificationNumber, mode]);

    /**
     * Aktualizuje hodnotu osoby podle inputu.
     *
     * @param {Event} e - Input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Odesílá osobu na API (vytvoření nebo aktualizace).
     * Po úspěšném uložení naviguje zpět na seznam osob se stavem success.
     *
     * @param {Event} e - Submit event formuláře.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        clearErrors();
        try {
            if (mode === "edit") {
                if (
                    JSON.stringify(initialPerson.current) !==
                    JSON.stringify(person)
                ) {
                    await apiPut("/api/persons/" + id, person);
                }
            } else {
                await apiPost("/api/persons", person);
            }

            navigate("/persons", {
                state: createSuccessState("Osoba byla úspěšně uložena."),
            });
        } catch (error) {
            handleErrors("Chyba při ukládání osoby", error);
        }
    };

    return {
        person,
        personLoading,
        receivedInvoices,
        setReceivedInvoices,
        sentInvoices,
        setSentInvoices,
        invoicesLoading: receivedInvoicesLoading && sentInvoicesLoading,
        deleteSuccess,
        setDeleteSuccess,
        handleChange,
        handleSubmit,
    };
};
