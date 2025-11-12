/**
 * Komponenta pro zobrazení upozornění s možností zavření.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {string} props.theme - Styl upozornění (např. "danger", "success", "warning").
 * @param {string|string[]} props.text - Text nebo pole pro zobrazení v upozornění.
 * @param {Function} [props.onClose] - Funkce volaná při zavření upozornění. Pokud není zadáno, tlačítko pro zavření se nezobrazí.
 * @returns {JSX.Element} Upozornění s možností zavření.
 */
export const FlashMessage = ({ theme, text, onClose }) => {
    return (
        <div
            className={`alert text-center my-4 alert-${theme}
                ${onClose ? " alert-dismissible" : ""}`}
            role="alert"
        >
            <strong>
                {Array.isArray(text)
                    ? text.map((item, index) => <div key={index}>{item}</div>)
                    : text}
            </strong>

            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                ></button>
            )}
        </div>
    );
};

export default FlashMessage;
