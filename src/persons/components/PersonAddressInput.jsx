import InputField from "../../components/inputs/InputField";
import InputCheck from "../../components/inputs/InputCheck";
import { Country } from "../../utils/countryFormatter";

/**
 * Komponenta pro zadání adresy osoby.
 * Obsahuje pole pro ulici, město, PSČ a výběr země (Česká republika / Slovensko).
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {object} props.person - Objekt osoby, jehož adresní údaje se upravují.
 * @param {Function} props.handleChange - Funkce volaná při změně inputu.
 * @returns {JSX.Element} Formulářová část pro zadání adresy osoby.
 */
const PersonAddressInput = ({ person, handleChange }) => {
    return (
        <div className="form-container">
            <div className="row">
                <div className="col-12 col-md mb-1">
                    <InputField
                        required={true}
                        type="text"
                        name="street"
                        min="3"
                        prompt="Zadejte ulici"
                        value={person.street}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col">
                    <InputField
                        required={true}
                        type="text"
                        name="city"
                        min="3"
                        prompt="Zadejte město"
                        value={person.city}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-4">
                    <InputField
                        required={true}
                        type="text"
                        name="zip"
                        min="3"
                        prompt="Zadejte PSČ"
                        value={person.zip}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <strong>Země:</strong>
                    <div className="row">
                        <div className="col text-center">
                            <InputCheck
                                type="radio"
                                name="country"
                                label="Česká republika"
                                value={Country.CZECHIA}
                                handleChange={handleChange}
                                checked={Country.CZECHIA === person.country}
                            />
                        </div>
                        <div className="col text-center">
                            <InputCheck
                                type="radio"
                                name="country"
                                label="Slovensko"
                                value={Country.SLOVAKIA}
                                handleChange={handleChange}
                                checked={Country.SLOVAKIA === person.country}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonAddressInput;
