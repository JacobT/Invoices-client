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
