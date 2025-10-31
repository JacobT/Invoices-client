import FlashMessage from "../components/FlashMessage";
import { usePersonDetail } from "./hooks/usePersonDetail";
import { useParams } from "react-router-dom";
import { usePageMode } from "../hooks/usePageMode";
import PersonLayout from "./components/PersonLayout";

const PersonDetail = () => {
    const { id } = useParams();
    const mode = usePageMode(id);
    const {
        person,
        sentState,
        successState,
        errorState,
        handleChange,
        handleSubmit,
    } = usePersonDetail(id);
    const layoutProps = { mode, person, handleChange };

    return (
        <div>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={
                        successState
                            ? "Uložení osobnosti proběhlo úspěšně."
                            : ""
                    }
                />
            )}

            {mode === "show" ? (
                <PersonLayout {...layoutProps} />
            ) : (
                <form onSubmit={handleSubmit}>
                    <PersonLayout {...layoutProps} />
                </form>
            )}
        </div>
    );
};

export default PersonDetail;
