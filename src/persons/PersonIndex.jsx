import SuccessDisplay from "../components/notification/SuccessDisplay";
import PersonTable from "./components/PersonTable";
import { usePersonIndex } from "./hooks/usePersonIndex";

const PersonIndex = () => {
    const {
        persons,
        personsStatistics,
        sentState,
        setSentState,
        handleDelete,
    } = usePersonIndex();

    return (
        <div>
            {sentState && (
                <SuccessDisplay state={sentState} setState={setSentState} />
            )}
            <h1>Seznam osob</h1>
            <hr />
            <PersonTable
                deletePerson={handleDelete}
                items={persons}
                statistics={personsStatistics}
                label="Počet osob:"
            />
        </div>
    );
};
export default PersonIndex;
