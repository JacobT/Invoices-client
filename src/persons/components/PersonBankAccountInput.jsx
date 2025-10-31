import InputField from "../../components/InputField";

const PersonBankAccountInput = ({ person, handleChange }) => {
    return (
        <>
            <div className="row mb-1">
                <div className="col">
                    <InputField
                        required={true}
                        type="text"
                        name="accountNumber"
                        min="3"
                        prompt="Zadejte číslo bankovního účtu"
                        value={person.accountNumber}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center fs-4">
                    /
                </div>
                <div className="col-4">
                    <InputField
                        required={true}
                        type="text"
                        name="bankCode"
                        min="3"
                        prompt="Zadejte kód banky"
                        value={person.bankCode}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <strong>
                        <InputField
                            required={true}
                            type="text"
                            name="iban"
                            min="3"
                            label="IBAN"
                            prompt="Zadejte IBAN"
                            value={person.iban}
                            handleChange={handleChange}
                        />
                    </strong>
                </div>
            </div>
        </>
    );
};

export default PersonBankAccountInput;
