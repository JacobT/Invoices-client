import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook pro správu úspěšného stavu (např. po provedení akce) a jeho vymazání po navigaci.
 *
 * @hook
 * @param {string} stateName - Název stavu, který se má sledovat v location.state.
 * @returns {[{message: message,}, Function]} Objekt obsahující aktuální úspěšný stav a funkci pro jeho nastavení.
 */
export const useSuccessState = (stateName) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [successState, setSuccessState] = useState(
        location.state?.[stateName] || null
    );

    useEffect(() => {
        if (successState) {
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, successState]);

    return [successState, setSuccessState];
};
