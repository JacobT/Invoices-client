import { Link } from "react-router-dom";

/**
 * Komponenta pro zobrazení navigačního odkazu s aktivním stavem.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {string} props.url - Cílová cesta odkazu.
 * @param {string} props.route - Aktuální cesta, pro porovnání s url a nastavení aktivního stavu.
 * @param {string} props.label - Text nebo prvek zobrazený v odkazu.
 * @param {Function} props.handleClick - Funkce volaná při kliknutí na odkaz.
 * @returns {JSX.Element} Navigační odkaz s možností zvýraznění aktivního stavu.
 */

const NavLink = ({ url, route, label, handleClick }) => {
    return (
        <Link
            to={url}
            className={`nav-link ${route === url ? "active" : ""}`}
            onClick={handleClick}
        >
            {label}
        </Link>
    );
};

export default NavLink;
