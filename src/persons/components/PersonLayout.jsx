import InputField from "../../components/InputField";
import EditableField from "../../components/EditableField";
import PersonBankAccountInput from "./PersonBankAccountInput";
import countryFormatter from "../../utils/countryFormatter";
import PersonAddressInput from "./PersonAddressInput";

const PersonLayout = ({ mode, person, handleChange }) => {
    return (
        <>
            <h1>
                {mode === "show"
                    ? "Detail osoby"
                    : mode === "edit"
                    ? "Upravit osobnost"
                    : "Vytvořit osobnost"}
            </h1>
            <hr />
            <div className="container form-container">
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
                            label={<strong>IČO: </strong>}
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
                    <div className="col">
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
                    <div className="col">
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
                                    required={true}
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
                {mode !== "show" && (
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Uložit"
                    />
                )}
            </div>
        </>
    );
};

export default PersonLayout;
