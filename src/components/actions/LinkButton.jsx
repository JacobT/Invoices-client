import { Link } from "react-router-dom";

const LinkButton = ({ url, label }) => {
    return (
        <Link to={url} className="btn bg-secondary">
            {label}
        </Link>
    );
};

export default LinkButton;
