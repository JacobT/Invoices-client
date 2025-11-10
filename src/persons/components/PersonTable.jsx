import TableActions from "../../components/actions/TableActions";

const PersonTable = ({ label, items, statistics, deletePerson }) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <div className="table-responsive mb-3">
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
                                        deleteItem={() =>
                                            deletePerson(item._id)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonTable;
