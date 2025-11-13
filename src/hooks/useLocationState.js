import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Custom hook pro správu navigačního stavu (např. po provedení akce) a jeho vymazání po navigaci.
 *
 * @hook
 * @returns {[{successMessage: message,}, Function]} Objekt obsahující aktuální stav a funkci pro jeho nastavení.
 */
export const useLocationState = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [locationState, setLocationState] = useState(location.state || null);

    useEffect(() => {
        if (locationState) {
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, locationState]);

    return [locationState, setLocationState];
};
