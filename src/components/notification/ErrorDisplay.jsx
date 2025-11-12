import { useErrorContext } from "../../contexts/ErrorContext";
import FlashMessage from "./FlashMessage";

/**
 * Komponenta pro zobrazení chybových hlášení z kontextu.
 *
 * @returns {JSX.Element} Kontejner se zprávou aktuální chyby.
 */
const ErrorDisplay = () => {
    const { errorsState, clearErrors } = useErrorContext();

    return (
        <div className="container narrow-container">
            {errorsState.length > 0 && (
                <FlashMessage
                    theme="danger"
                    text={errorsState}
                    onClose={clearErrors}
                />
            )}
        </div>
    );
};

export default ErrorDisplay;
