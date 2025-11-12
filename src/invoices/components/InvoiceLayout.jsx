import InputField from "../../components/inputs/InputField";
import InputSelect from "../../components/inputs/InputSelect";
import InvoicePersonDetail from "./InvoicePersonDetail";
import EditableField from "../../components/inputs/EditableField";
import { dateStringFormatter } from "../../utils/dateStringFormatter";
import InvoiceProductDisplay from "./InvoiceProductDisplay";
import InvoiceProductInput from "./InvoiceProductInput";
import LinkButton from "../../components/actions/LinkButton";

/**
 * Komponenta pro zobrazení, úpravu nebo vytvoření faktury.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"create"|"edit"|"show"} props.mode - Určuje režim zobrazení komponenty.
 * @param {object} props.invoice - Objekt faktury obsahující data.
 * @param {Array<object>} props.people - Pole osob (dodavatelé a odběratelé) pro výběr ve formuláři.
 * @param {Function} props.handleChange - Funkce volaná při změně vstupních hodnot.
 * @returns {JSX.Element} Formulář nebo přehled faktury.
 */
const InvoiceLayout = ({ mode, invoice, people, handleChange }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        {mode === "show" ? (
                            <h1 className="m-0">
                                Faktura č.{invoice.invoiceNumber}
                            </h1>
                        ) : (
                            <div className="d-flex flex-wrap align-items-center gap-2">
                                <h1 className="m-0">
                                    {mode === "edit" ? "Upravit " : "Vytvořit "}
                                    fakturu č.
                                </h1>
                                <InputField
                                    required={true}
                                    type="number"
                                    name="invoiceNumber"
                                    prompt="Zadejte číslo faktury"
                                    value={invoice.invoiceNumber}
                                    handleChange={handleChange}
                                    style={{ maxWidth: "15ch" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <LinkButton
                            url={"/invoices"}
                            label={"Zpět na seznam"}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="container narrow-container form-container">
                <div className="row">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
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
                        {invoice.seller._id && (
                            <InvoicePersonDetail person={invoice.seller} />
                        )}
                    </div>
                    <div className="col-12 col-md-6">
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
                        {invoice.buyer._id && (
                            <InvoicePersonDetail person={invoice.buyer} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="row">
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
                <div className="row">
                    <div className="col">
                        <EditableField
                            mode={mode}
                            display={
                                <InvoiceProductDisplay invoice={invoice} />
                            }
                            input={
                                <InvoiceProductInput
                                    invoice={invoice}
                                    handleChange={handleChange}
                                />
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
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
                </div>
                <div className="row">
                    <div className="col text-center">
                        {mode !== "show" && (
                            <input
                                type="submit"
                                className="btn bg-primary"
                                value={"Uložit"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceLayout;
