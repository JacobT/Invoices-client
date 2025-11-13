/**
 * Komponenta rozhodující o zobrazení v závislosti na režimu.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"show" | "edit" | "create"} props.mode - Určuje režim zobrazení; "show" zobrazí hodnotu, jinak se zobrazí vstupní pole.
 * @param {string} props.label - Popisek pole (např. název nebo štítek).
 * @param {string} props.display - Prvek zobrazovaný v režimu "show" (např. formátovaný text).
 * @param {JSX.Element} props.input - Prvek pro úpravu hodnoty (např. vstupní pole).
 * @param {boolean} [props.createOnly=false] - Určuje, zda lze údaj měnit po vytvoření.
 * @returns {JSX.Element} Vyhodnocený prvek.
 */
const EditableField = ({ mode, label, display, input, createOnly = false }) => {
    return (
        <div>
            {label}
            {mode === "show" || (createOnly && mode !== "create")
                ? display
                : input}
        </div>
    );
};

export default EditableField;
