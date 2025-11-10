import { Link } from "react-router-dom";
import SuccessDisplay from "../components/notification/SuccessDisplay";
import PersonTable from "./components/PersonTable";
import { usePersonIndex } from "./hooks/usePersonIndex";
import LoadingDisplay from "../components/layout/LoadingDisplay";

const PersonIndex = () => {
    const {
        persons,
        personsStatistics,
        sentState,
        setSentState,
        isLoading,
        handleDelete,
    } = usePersonIndex();

    return (
        <div>
            {sentState && (
                <SuccessDisplay state={sentState} setState={setSentState} />
            )}
            <h1>Seznam osob</h1>
            <hr />
            {isLoading ? (
                <LoadingDisplay />
            ) : (
                <PersonTable
                    deletePerson={handleDelete}
                    items={persons}
                    statistics={personsStatistics}
                    label="Počet osob:"
                />
            )}
            <Link to={"/persons/create"} className="btn bg-success">
                Nová osoba
            </Link>
        </div>
    );
};
export default PersonIndex;
