import PersonTable from "./components/PersonTable";
import { usePersonIndex } from "./hooks/usePersonIndex";

const PersonIndex = () => {
    const { persons, personsStatistics, handleDelete } = usePersonIndex();

    return (
        <div>
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
