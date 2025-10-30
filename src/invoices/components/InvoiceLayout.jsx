import InputField from "../../components/InputField";
import InputSelect from "../../components/InputSelect";
import InvoicePersonDetail from "./InvoicePersonDetail";
import EditableField from "../../components/EditableField";
import { dateStringFormatter } from "../../utils/dateStringFormatter";
import InvoiceProductDisplay from "./InvoiceProductDisplay";
import InvoiceProductInput from "./InvoiceProductInput";

const InvoiceLayout = ({ mode, invoice, people, handleChange }) => {
    return (
        <>
            <h1>
                {mode === "show" ? (
                    <>Faktura č.{invoice.invoiceNumber}</>
                ) : (
                    <>
                        {mode === "edit" ? "Upravit " : "Vytvořit "}fakturu č.
                        <InputField
                            required={true}
                            type="number"
                            name="invoiceNumber"
                            prompt="Zadejte číslo faktury"
                            value={invoice.invoiceNumber}
                            handleChange={handleChange}
                        />
                    </>
                )}
            </h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <EditableField
                        mode={mode}
                        label={<h4>Dodavatel:</h4>}
                        display={<h5>{invoice.seller.name}</h5>}
                        input={
                            <InputSelect
                                name={"seller"}
                                items={people}
                                required={true}
                                value={invoice.seller._id}
                                handleChange={handleChange}
                                prompt={"Vyberte dodavatele..."}
                            />
                        }
                    />
                    <InvoicePersonDetail person={invoice.seller} />
                </div>
                <div className="col-6">
                    <EditableField
                        mode={mode}
                        label={<h4>Odběratel:</h4>}
                        display={<h5>{invoice.buyer.name}</h5>}
                        input={
                            <InputSelect
                                name={"buyer"}
                                items={people}
                                required={true}
                                value={invoice.buyer._id}
                                handleChange={handleChange}
                                prompt={"Vyberte odběratele..."}
                            />
                        }
                    />
                    <InvoicePersonDetail person={invoice.buyer} />
                </div>
            </div>
            <hr />
            <div className="row mb-3">
                <div className="col-6 text-center">
                    <EditableField
                        mode={mode}
                        label={<strong>Datum vystavení: </strong>}
                        display={dateStringFormatter(invoice.issued, true)}
                        input={
                            <InputField
                                required={true}
                                type="date"
                                name="issued"
                                prompt="Zadejte datum"
                                value={dateStringFormatter(invoice.issued)}
                                handleChange={handleChange}
                            />
                        }
                    />
                </div>
                <div className="col-6 text-center">
                    <EditableField
                        mode={mode}
                        label={<strong>Datum splatnosti: </strong>}
                        display={dateStringFormatter(invoice.dueDate, true)}
                        input={
                            <InputField
                                required={true}
                                type="date"
                                name="dueDate"
                                prompt="Zadejte datum"
                                value={dateStringFormatter(invoice.dueDate)}
                                handleChange={handleChange}
                            />
                        }
                    />
                </div>
            </div>
            <EditableField
                mode={mode}
                display={<InvoiceProductDisplay invoice={invoice} />}
                input={
                    <InvoiceProductInput
                        invoice={invoice}
                        handleChange={handleChange}
                    />
                }
            />
            <div className="row mb-3">
                <EditableField
                    mode={mode}
                    label={<strong>Poznámka: </strong>}
                    display={
                        <>
                            <br />
                            {invoice.note}
                        </>
                    }
                    input={
                        <InputField
                            required={false}
                            type="textarea"
                            name="note"
                            rows="3"
                            value={invoice.note}
                            handleChange={handleChange}
                        />
                    }
                />
            </div>
            {mode !== "show" && (
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Uložit"}
                />
            )}
        </>
    );
};

export default InvoiceLayout;
