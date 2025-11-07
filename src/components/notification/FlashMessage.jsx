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
