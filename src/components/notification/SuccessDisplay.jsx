import { useEffect } from "react";
import FlashMessage from "./FlashMessage.jsx";

const SuccessDisplay = ({ state, setState }) => {
    useEffect(() => {
        const timer = setTimeout(() => setState(null), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed-alert">
            <FlashMessage theme={"success"} text={state.message} />
        </div>
    );
};

export default SuccessDisplay;
