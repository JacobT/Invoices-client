import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
