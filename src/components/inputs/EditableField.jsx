/**
 * Komponenta rozhodující o zobrazení v závislosti na režimu.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {"show" | "edit" | "create"} props.mode - Určuje režim zobrazení; "show" zobrazí hodnotu, jinak se zobrazí vstupní pole.
 * @param {string} props.label - Popisek pole (např. název nebo štítek).
 * @param {string} props.display - Prvek zobrazovaný v režimu "show" (např. formátovaný text).
 * @param {JSX.Element} props.input - Prvek pro úpravu hodnoty (např. vstupní pole).
 * @returns {JSX.Element} Vyhodnocený prvek.
 */
const EditableField = ({ mode, label, display, input }) => {
    return (
        <div>
            {label}
            {mode === "show" ? display : input}
        </div>
    );
};

export default EditableField;
