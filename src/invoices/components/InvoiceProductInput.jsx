import InputField from "../../components/inputs/InputField";

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
