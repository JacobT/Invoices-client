import { Link } from "react-router-dom";

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
