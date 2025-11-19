import { useState } from "react";
import { ApiRequestError } from "../utils/api";

const NOT_FOUND_STATUS = 404;

/**
 * @typedef {Object} HandleErrorsReturn
 * @property {string[]} errorsState - Pole aktuálních chybových zpráv.
 * @property {(message: string, error: Error, setEmptyState?: Function) => void} handleErrors - Funkce pro zpracování chyby a přidání do stavu.
 * @property {() => void} clearErrors - Funkce pro vymazání všech chyb.
 */

/**
 * Custom hook pro správu chyb v aplikaci.
 * Umožňuje sledovat stav chyb, přidávat nové chyby a mazat aktuální chyby.
 *
 * @hook
 * @returns {HandleErrorsReturn} Objekt obsahující stav chyb a utility funkce pro jejich správu.
 */
export const useHandleErrors = () => {
    const [errorsState, setErrors] = useState([]);

    /**
     * Přidá chybu do stavu, pokud ještě není přítomna.
     *
     * @param {string} errorText - Text chyby, která se má přidat.
     */
    const addError = (errorText) => {
        setErrors((prev) =>
            prev.includes(errorText) ? prev : [...prev, errorText]
        );
    };

    /**
     * Funkce pro zpracování chyb. Volitelně může nastavit stav prázdného seznamu.
     *
     * @param {string} message - Zpráva, která popisuje kontext chyby.
     * @param {Error} error - Chyba, která byla zachycena.
     * @param {Function} [setEmptyState=null] - Volitelná funkce pro nastavení prázdného stavu.
     */
    const handleErrors = (message, error, setEmptyState = null) => {
        if (
            error instanceof ApiRequestError &&
            error.response.status === NOT_FOUND_STATUS
        ) {
            if (setEmptyState) {
                setEmptyState();
            } else {
                console.log(error);
                addError(`${message}: "${error.message}"`);
            }
        } else {
            console.log(error);
            addError(`${message}: "${error.message}"`);
        }
    };

    /**
     * Vymaže všechny aktuální chyby.
     */
    const clearErrors = () => setErrors([]);

    return { errorsState, handleErrors, clearErrors };
};
