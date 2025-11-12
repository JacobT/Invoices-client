import { createContext, useContext, useEffect } from "react";
import { useHandleErrors } from "../hooks/useHandleErrors";
import { useLocation } from "react-router-dom";

const ErrorContext = createContext();

/**
 * Provider komponenta pro chybový kontext.
 * Poskytuje stav chyb, funkci pro jejich nastavení a vymazání všem potomkům.
 *
 * @component
 * @param {object} props - Vlastnosti komponenty.
 * @param {React.ReactNode} props.children - Potomci, kteří budou mít přístup ke kontextu.
 * @returns {JSX.Element} Provider poskytující chybový kontext svým potomkům.
 */
export const ErrorProvider = ({ children }) => {
    const { errorsState, handleErrors, clearErrors } = useHandleErrors();
    const location = useLocation();

    useEffect(() => {
        clearErrors();
    }, [location.pathname]);

    return (
        <ErrorContext.Provider
            value={{ errorsState, handleErrors, clearErrors }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

/**
 * @typedef {Object} ErrorContextType
 * @property {string[]} errorsState - Pole aktuálních chybových zpráv.
 * @property {Function} handleErrors - Funkce pro zpracování chyby a přidání do stavu.
 * @property {Function} clearErrors - Funkce pro vymazání všech chyb.
 */

/**
 * Hook pro přístup k chybovému kontextu.
 *
 * @hook
 * @returns {ErrorContextType} Stav chyb a funkce pro jejich manipulaci.
 */
export const useErrorContext = () => useContext(ErrorContext);
