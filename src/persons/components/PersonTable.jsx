import TableActions from "../../components/actions/TableActions";

/**
 * Komponenta pro zobrazení tabulky osob s jejich statistikami.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {Array<Object>} props.items - Pole objektů osob.
 * @param {Array<Object>} props.statistics - Pole statistik osob.
 * @param {Function} props.deletePerson - Funkce pro smazání osoby podle jejího id.
 * @returns {JSX.Element} Tabulka osob se souhrnem příjmů a akcemi.
 */
const PersonTable = ({ items, statistics, deletePerson }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover text-center align-middle">
                <thead className="table-light align-middle">
                    <tr>
                        <th>#</th>
                        <th className="text-start">Jméno</th>
                        <th>IČO</th>
                        <th>Celkové příjmy</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td className="text-start">{item.name}</td>
                            <td>{item.identificationNumber}</td>
                            <td>
                                {statistics.filter(
                                    (person) => person.personId == item._id
                                )[0]?.totalRevenue ?? 0}
                            </td>
                            <td>
                                <TableActions
                                    detailUrl={"/persons/show/" + item._id}
                                    editUrl={"/persons/edit/" + item._id}
                                    deleteItem={() => deletePerson(item._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonTable;
