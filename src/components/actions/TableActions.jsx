import { Link } from "react-router-dom";
import { ShowIcon, EditIcon, DeleteIcon } from "../../assets/icons/icons";

const TableActions = ({ detailUrl, editUrl, deleteItem }) => {
    return (
        <div className="btn-group">
            <Link to={detailUrl} className="btn btn-sm bg-info bg-opacity-25">
                <img src={ShowIcon} alt="Zobrazit" />
            </Link>
            <Link to={editUrl} className="btn btn-sm bg-warning bg-opacity-25">
                <img src={EditIcon} alt="Upravit" />
            </Link>
            <button
                onClick={deleteItem}
                className="btn btn-sm bg-danger bg-opacity-25"
            >
                <img src={DeleteIcon} alt="Smazat" />
            </button>
        </div>
    );
};

export default TableActions;
