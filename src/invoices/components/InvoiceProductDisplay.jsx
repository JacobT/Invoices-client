const InvoiceProductDisplay = ({ invoice }) => {
    return (
        <div className="row mb-3">
            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Položka:</th>
                            <th>Cena:</th>
                            <th>DPH:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{invoice.product}</td>
                            <td>{invoice.price}</td>
                            <td>{invoice.vat}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceProductDisplay;
