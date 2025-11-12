/**
 * Komponenta pro zobrazení informací o produktu uvedeném na faktuře.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {object} props.invoice - Objekt faktury obsahující údaje o produktu.
 * @param {string} props.invoice.product - Název produktu nebo služby na faktuře.
 * @param {number|string} props.invoice.price - Cena produktu.
 * @param {number|string} props.invoice.vat - Hodnota DPH v procentech.
 * @returns {JSX.Element} Tabulka zobrazující název produktu, cenu a sazbu DPH.
 */
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
