/**
 * Komponenta pro vytvoření vstupního pole.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"text"|"number"|"date"|"textarea"} props.type - Typ vstupu.
 * @param {boolean} [props.required=false] - Určuje, zda je pole povinné.
 * @param {number|null} [props.min=null] - Minimální hodnota (pro number) nebo minimální délka (pro text/textarea).
 * @param {string} props.label - Popisek pole.
 * @param {string} props.prompt - Placeholder nebo nápověda pro uživatele.
 * @param {number} [props.rows] - Počet řádků pro textarea.
 * @param {string} props.name - Název vstupu.
 * @param {string|number} props.value - Hodnota vstupu.
 * @param {Function} props.handleChange - Funkce volaná při změně hodnoty.
 * @returns {JSX.Element|null} Vstupní pole nebo null pokud typ není podporován.
 */
export const InputField = ({
    type,
    required = false,
    min = null,
    label,
    prompt,
    rows,
    name,
    value,
    handleChange,
    ...props
}) => {
    // podporované typy pro element input
    const INPUTS = ["text", "number", "date"];

    // validace elementu a typu
    const typeNormalized = type.toLowerCase();
    const isTextarea = typeNormalized === "textarea";

    if (!isTextarea && !INPUTS.includes(typeNormalized)) {
        return null;
    }

    return (
        <div className="form-group">
            {label && <label>{label}:</label>}

            {/* vykreslení aktuálního elementu */}
            {isTextarea ? (
                <textarea
                    required={required}
                    className="form-control"
                    placeholder={prompt}
                    rows={rows}
                    minLength={min}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    {...props}
                />
            ) : (
                <input
                    required={required}
                    type={typeNormalized}
                    className="form-control"
                    placeholder={prompt}
                    minLength={min}
                    min={min}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    {...props}
                />
            )}
        </div>
    );
};

export default InputField;
