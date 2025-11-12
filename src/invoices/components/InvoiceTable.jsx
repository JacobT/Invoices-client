import { dateStringFormatter } from "../../utils/dateStringFormatter";
import { useInvoiceTable } from "../hooks/useInvoiceTable";
import TableActions from "../../components/actions/TableActions";

/**
 * Komponenta pro zobrazení tabulky faktur.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {Array<object>} props.items - Pole objektů faktur, které se mají zobrazit.
 * @param {Function} props.setItems - Funkce pro aktualizaci seznamu faktur.
 * @returns {JSX.Element} Tabulka se seznamem faktur a akcemi.
 */
const InvoiceTable = ({ items, setItems }) => {
    const handleDelete = useInvoiceTable(items, setItems);

    return (
        <div className="table-responsive mb-3">
            <table className="table table-bordered table-striped table-hover text-center align-middle">
                <thead className="table-light align-middle">
                    <tr>
                        <th>#</th>
                        <th>Faktura</th>
                        <th>Datum vydání</th>
                        <th>Datum splatnosti</th>
                        <th>Cena</th>
                        <th>Dodavatel</th>
                        <th>Odběratel</th>
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
                            <td>{item.seller.name}</td>
                            <td>{item.buyer.name}</td>
                            <td>
                                <TableActions
                                    detailUrl={"/invoices/show/" + item._id}
                                    editUrl={"/invoices/edit/" + item._id}
                                    deleteItem={() => handleDelete(item._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
