import { Link } from "react-router-dom";

/**
 * Znovupoužitelný odkaz ve stylu tlačítka pomocí React Routeru.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {string} props.url - Cílová cesta odkazu.
 * @param {string} props.label - Text zobrazený na tlačítku.
 * @returns {JSX.Element} Odkaz ve stylu tlačítka.
 */
const LinkButton = ({ url, label }) => {
    return (
        <Link to={url} className="btn bg-secondary">
            {label}
        </Link>
    );
};

export default LinkButton;
