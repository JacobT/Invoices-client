import { useEffect } from "react";
import FlashMessage from "./FlashMessage.jsx";

/**
 * Komponenta pro zobrazení úspěšné zprávy s automatickým skrytím.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {{ message: string }} props.state - Objekt s úspěšnou zprávou k zobrazení.
 * @param {Function} props.setState - Funkce nastavení stavu pro skrytí zprávy.
 * @returns {JSX.Element} Kontejner s úspěšnou zprávou.
 */
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
