import { useNavigate } from "react-router-dom";

/**
 * Tlačítk, které se vrátí o stranu zpět pomocí React Routeru.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {string} props.label - Text zobrazený na tlačítku.
 * @returns {JSX.Element} Tlačítko zpět.
 */
const BackButton = ({ label }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
        >
            {label}
        </button>
    );
};

export default BackButton;
