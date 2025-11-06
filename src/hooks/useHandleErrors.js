import { useState } from "react";
import { ApiRequestError } from "../utils/api";

export const useHandleErrors = () => {
    const [errorsState, setErrors] = useState([]);

    const addError = (errorText) => {
        setErrors((prev) =>
            prev.includes(errorText) ? prev : [...prev, errorText]
        );
    };

    const handleErrors = (message, error, setEmptyState = null) => {
        if (error instanceof ApiRequestError && error.response.status === 404) {
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

    const clearErrors = () => setErrors([]);

    return { errorsState, handleErrors, clearErrors };
};
