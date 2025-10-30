import InputField from "../../components/InputField";

const InvoiceProductInput = ({ invoice, handleChange }) => {
    return (
        <div className="row mb-3">
            <div className="col">
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
            <div className="col">
                <strong>
                    <InputField
                        required={true}
                        type="number"
                        name="price"
                        label="Cena"
                        prompt="Zadejte cenu"
                        value={invoice.price}
                        handleChange={handleChange}
                    />
                </strong>
            </div>
            <div className="col">
                <strong>
                    <InputField
                        required={true}
                        type="number"
                        name="vat"
                        label="DPH [%]"
                        prompt="Uveďte procento DPH"
                        value={invoice.vat}
                        handleChange={handleChange}
                    />
                </strong>
            </div>
        </div>
    );
};

export default InvoiceProductInput;
