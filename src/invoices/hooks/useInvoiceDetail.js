import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../contexts/ErrorContext";
import { createSuccessState } from "../../utils/createSuccessState";

/**
 * @typedef {Object} Person
 * @property {string} _id - ID osoby.
 * @property {string} [name] - Jméno osoby.
 * @property {string} [identificationNumber] - IČO.
 * @property {string} [taxNumber] - DIČ.
 * @property {string} [accountNumber] - Bankovní účet.
 * @property {string} [bankCode] - Kód banky.
 * @property {string} [iban] - IBAN.
 * @property {string} [telephone] - Telefon.
 * @property {string} [mail] - Email.
 * @property {string} [street] - Ulice.
 * @property {string} [city] - Město.
 * @property {string} [zip] - PSČ.
 * @property {string} [country] - Země.
 */

/**
 * @typedef {Object} Invoice
 * @property {string} invoiceNumber - Číslo faktury.
 * @property {string} issued - Datum vystavení.
 * @property {string} dueDate - Datum splatnosti.
 * @property {string} product - Název produktu.
 * @property {string|number} price - Cena produktu.
 * @property {string|number} vat - DPH [%].
 * @property {string} note - Poznámka.
 * @property {Person} buyer - Odběratel.
 * @property {Person} seller - Dodavatel.
 */

/**
 * @typedef {Object} InvoiceDetailReturn
 * @property {Invoice} invoice - Aktuální stav faktury.
 * @property {Array<Person>} people - Seznam všech osob.
 * @property {boolean} isLoading - Indikátor načítání dat.
 * @property {(e: Event) => void} handleChange - Funkce pro aktualizaci faktury při změně inputu/selectu.
 * @property {(e: Event) => Promise<void>} handleSubmit - Funkce pro odeslání faktury (vytvoření/úprava).
 */

/**
 * Custom hook pro detail faktury.
 * Načítá fakturu a seznam osob, poskytuje utility pro změnu polí a odeslání formuláře.
 *
 * @hook
 * @param {string} [id] - ID faktury, pokud se má editovat existující faktura.
 * @returns {InvoiceDetailReturn} Objekt obsahující data faktury, seznam osob, loading stav a funkce pro změnu a odeslání.
 */
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

    /**
     * Načte fakturu z API podle ID.
     */
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

    /**
     * Načte seznam všech osob z API.
     */
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

    /**
     * Aktualizuje stav faktury při změně inputu nebo selectu.
     *
     * @param {Event} e - Event inputu/selectu.
     */
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

    /**
     * Odesílá fakturu na API (vytvoření nebo aktualizace).
     * Po úspěšném uložení naviguje zpět na seznam faktur se stavem success.
     *
     * @param {Event} e - Submit event formuláře.
     */
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
