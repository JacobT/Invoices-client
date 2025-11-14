import InputField from "../../components/inputs/InputField";
import EditableField from "../../components/inputs/EditableField";
import PersonBankAccountInput from "./PersonBankAccountInput";
import countryFormatter from "../../utils/countryFormatter";
import PersonAddressInput from "./PersonAddressInput";
import BackButton from "../../components/actions/BackButton";

/**
 * Komponenta pro zobrazení, úpravu nebo vytvoření detailu osoby.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"show"|"edit"|"create"} props.mode - Režim zobrazení.
 * @param {object} props.person - Objekt osoby obsahující údaje.
 * @param {Function} props.handleChange - Funkce volaná při změně inputu nebo selectu, aktualizuje stav osoby.
 * @returns {JSX.Element} Formulář pro zobrazení, úpravu osoby nebo vytvoření detailu osoby.
 */
const PersonLayout = ({ mode, person, handleChange }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>
                            {mode === "show"
                                ? "Detail osoby"
                                : mode === "edit"
                                ? "Upravit osobu"
                                : "Vytvořit osobu"}
                        </h1>
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <BackButton label={"Zpět na seznam"} />
                    </div>
                </div>
            </div>
            <hr />
            <div className="container form-container narrow-container">
                <div className="row">
                    <div className="col">
                        <EditableField
                            mode={mode}
                            label={null}
                            display={<h3>{person.name}</h3>}
                            input={
                                <strong>
                                    <InputField
                                        required={true}
                                        type="text"
                                        name="name"
                                        label="Jméno"
                                        min="3"
                                        prompt="Zadejte celé jméno"
                                        value={person.name}
                                        handleChange={handleChange}
                                    />
                                </strong>
                            }
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <EditableField
                            mode={mode}
                            label={
                                <strong>
                                    IČO:{" "}
                                    {mode === "edit" && (
                                        <small className="text-warning">
                                            (nelze změnit)
                                        </small>
                                    )}
                                </strong>
                            }
                            display={person.identificationNumber}
                            input={
                                <InputField
                                    required={true}
                                    type="text"
                                    name="identificationNumber"
                                    min="3"
                                    prompt="Zadejte IČO"
                                    value={person.identificationNumber}
                                    handleChange={handleChange}
                                    disabled={mode === "edit"}
                                />
                            }
                        />
                    </div>
                    <div className="col">
                        <EditableField
                            mode={mode}
                            label={<strong>DIČ: </strong>}
                            display={person.taxNumber}
                            input={
                                <InputField
                                    required={true}
                                    type="text"
                                    name="taxNumber"
                                    min="3"
                                    prompt="Zadejte DIČ"
                                    value={person.taxNumber}
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
                            label={<strong>Bankovní účet: </strong>}
                            display={`${person.accountNumber}/${person.bankCode} (${person.iban})`}
                            input={
                                <PersonBankAccountInput
                                    person={person}
                                    handleChange={handleChange}
                                />
                            }
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md">
                        <EditableField
                            mode={mode}
                            label={<strong>Tel.: </strong>}
                            display={person.telephone}
                            input={
                                <InputField
                                    required={true}
                                    type="text"
                                    name="telephone"
                                    min="3"
                                    prompt="Zadejte Telefon"
                                    value={person.telephone}
                                    handleChange={handleChange}
                                />
                            }
                        />
                    </div>
                    <div className="col-12 col-md">
                        <EditableField
                            mode={mode}
                            label={<strong>Mail: </strong>}
                            display={person.mail}
                            input={
                                <InputField
                                    required={true}
                                    type="text"
                                    name="mail"
                                    min="3"
                                    prompt="Zadejte mail"
                                    value={person.mail}
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
                            label={<strong>Sídlo: </strong>}
                            display={`${person.street}, 
                                    ${person.city}, 
                                    ${person.zip}, 
                                    ${countryFormatter(person.country)}`}
                            input={
                                <PersonAddressInput
                                    person={person}
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
                            display={person.note}
                            input={
                                <InputField
                                    type="textarea"
                                    name="note"
                                    rows="3"
                                    value={person.note}
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
                                value="Uložit"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonLayout;
