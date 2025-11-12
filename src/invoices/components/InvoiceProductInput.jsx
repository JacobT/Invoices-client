import InputField from "../../components/inputs/InputField";

/**
 * Komponenta pro zadávání údajů o produktu na faktuře.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {object} props.invoice - Objekt faktury obsahující údaje o produktu.
 * @param {string} props.invoice.product - Název produktu nebo služby.
 * @param {number|string} props.invoice.price - Cena produktu.
 * @param {number|string} props.invoice.vat - Hodnota DPH v procentech.
 * @param {function} props.handleChange - Funkce pro zpracování změn vstupních polí.
 * @returns {JSX.Element} Formulářová část pro zadání názvu produktu, ceny a DPH.
 */

const InvoiceProductInput = ({ invoice, handleChange }) => {
    return (
        <div className="row mb-3">
            <div className="col d-flex align-items-end">
                <strong>
                    <InputField
                        required={true}
                        type="text"
                        name="product"
                        label="Název produktu"
                        prompt="Produkt"
                        value={invoice.product}
                        handleChange={handleChange}
                    />
                </strong>
            </div>
            <div className="col d-flex align-items-end">
                <strong>
                    <InputField
                        required={true}
                        type="number"
                        name="price"
                        label="Cena"
                        prompt="Cena"
                        value={invoice.price}
                        handleChange={handleChange}
                    />
                </strong>
            </div>
            <div className="col d-flex align-items-end">
                <strong>
                    <InputField
                        required={true}
                        type="number"
                        name="vat"
                        label="DPH [%]"
                        prompt="DPH"
                        value={invoice.vat}
                        handleChange={handleChange}
                    />
                </strong>
            </div>
        </div>
    );
};

export default InvoiceProductInput;
