import { createContext, useContext, useEffect } from "react";
import { useHandleErrors } from "../hooks/useHandleErrors";
import { useLocation } from "react-router-dom";

const ErrorContext = createContext();

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

export const useErrorContext = () => useContext(ErrorContext);
