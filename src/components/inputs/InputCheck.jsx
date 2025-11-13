/**
 * Komponenta pro zobrazení chceckboxu nebo radiobuttonu.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"checkbox"|"radio"} props.type - Typ vstupu.
 * @param {boolean} [props.checked] - Stav zaškrtnutí.
 * @param {string} props.name - Název vstupu.
 * @param {string} props.label - Popisek vedle vstupu.
 * @param {string} props.value - Hodnota vstupu.
 * @param {Function} props.handleChange - Funkce volaná při změně hodnoty.
 * @returns {JSX.Element|null} Checkbox, radiobutton nebo null pokud typ není podporován.
 */
export const InputCheck = ({
    type,
    checked = false,
    name,
    label,
    value,
    handleChange,
}) => {
    // podporované typy pro element input
    const INPUTS = ["checkbox", "radio"];

    // validace typu
    const typeNormalized = type.toLowerCase();
    if (!INPUTS.includes(typeNormalized)) {
        return null;
    }

    return (
        <div className="form-group form-check">
            <label className="form-check-label">
                {/* vykreslení s aktuálním typem */}
                <input
                    type={typeNormalized}
                    className="form-check-input"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                />{" "}
                {label}
            </label>
        </div>
    );
};

export default InputCheck;
