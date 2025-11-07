import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";

const Navbar = () => {
    const route = useLocation().pathname;
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark text-nowrap">
            <strong className="navbar-brand ms-4">Invoices</strong>

            <button
                className="navbar-toggler me-4"
                type="button"
                onClick={handleClick}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav me-auto ms-4">
                    <li className="nav-item">
                        <NavLink
                            url={"/persons"}
                            route={route}
                            label={"Osoby"}
                            handleClick={handleClick}
                        />
                    </li>
                    <li className="nav-item">
                        <NavLink
                            url={"/invoices"}
                            route={route}
                            label={"Faktury"}
                            handleClick={handleClick}
                        />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
