import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSuccessState as useSuccessState } from "../../hooks/useSuccessState";

/**
 * @typedef {Object} PersonIndexReturn
 * @property {Array<Object>} persons - Pole všech osob.
 * @property {Array<Object>} personsStatistics - Statistiky osob.
 * @property {{ success: boolean, message: string } | null} sentState - Stav úspěšné akce (např. odeslání formuláře).
 * @property {Function} setSentState - Funkce pro nastavení stavu `sentState`.
 * @property {boolean} isLoading - Indikátor načítání dat.
 * @property {Function} handleDelete - Funkce pro smazání osoby podle ID.
 */

/**
 * Custom hook pro správu seznamu osob a jejich statistik.
 *
 * @hook
 * @returns {PersonIndexReturn} Stav a funkce pro práci s osobami.
 */
export const usePersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personsStatistics, setPersonsStatistics] = useState([]);

    const { handleErrors, clearErrors } = useErrorContext();
    const [sentState, setSentState] = useSuccessState("sent");
    const [isLoading, setLoading] = useState(true);

    /**
     * Načítá seznam osob z API a nastavuje stav načítání.
     */
    useEffect(() => {
        const getPeople = async () => {
            try {
                setPersons(await apiGet("/api/persons"));
            } catch (error) {
                handleErrors("Chyba při načítání osob", error);
            } finally {
                setLoading(false);
            }
        };
        getPeople();
    }, []);

    /**
     * Načítá statistiky osob z API a nastavuje stav načítání.
     */
    useEffect(() => {
        const getStatistics = async () => {
            try {
                setPersonsStatistics(await apiGet("/api/persons/statistics"));
            } catch (error) {
                handleErrors("Chyba při načítání statistik", error);
            } finally {
                setLoading(false);
            }
        };
        getStatistics();
    }, []);

    /**
     * Odstraní osobu podle ID a aktualizuje lokální stav.
     *
     * @async
     * @param {string} id - ID osoby, která se má smazat.
     */
    const handleDelete = async (id) => {
        clearErrors();

        try {
            await apiDelete("/api/persons/" + id);
            setPersons((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            handleErrors("Chyba při mazání osoby", error);
        }
    };

    return {
        persons,
        personsStatistics,
        sentState,
        setSentState,
        isLoading,
        handleDelete,
    };
};
