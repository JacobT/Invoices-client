import { Link } from "react-router-dom";
import { dateStringFormatter } from "../utils/dateStringFormatter";

const InvoiceTable = ({ items, deleteInvoice }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Faktura</th>
                        <th>Datum vydání</th>
                        <th>Datum splatnosti</th>
                        <th>Cena</th>
                        <th>Odběratel</th>
                        <th>Prodejce</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{dateStringFormatter(item.issued, true)}</td>
                            <td>{dateStringFormatter(item.dueDate, true)}</td>
                            <td>{item.price}</td>
                            <td>{item.buyer.name}</td>
                            <td>{item.seller.name}</td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
