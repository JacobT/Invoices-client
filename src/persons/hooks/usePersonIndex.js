import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";

export const usePersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personsStatistics, setPersonsStatistics] = useState([]);

    const handleDelete = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        apiGet("/api/persons/statistics").then((data) =>
            setPersonsStatistics(data)
        );
    }, []);

    return { persons, personsStatistics, handleDelete };
};
