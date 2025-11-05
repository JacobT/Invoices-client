import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { useHandleErrors } from "../../hooks/useHandleErrors";

export const usePersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personsStatistics, setPersonsStatistics] = useState([]);
    const { errorsState, handleErrors, clearErrors } = useHandleErrors();

    useEffect(() => {
        const getPeople = async () => {
            try {
                setPersons(await apiGet("/api/persons"));
            } catch (error) {
                handleErrors("Chyba při načítání osob", error);
            }
        };
        getPeople();
    }, []);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                setPersonsStatistics(await apiGet("/api/persons/statistics"));
            } catch (error) {
                handleErrors("Chyba při načítání statistik", error);
            }
        };
        getStatistics();
    }, []);

    const handleDelete = async (id) => {
        clearErrors();

        try {
            await apiDelete("/api/persons/" + id);
            setPersons(persons.filter((item) => item._id !== id));
        } catch (error) {
            handleErrors("Chyba při mazání osoby", error);
        }
    };

    return { persons, personsStatistics, errorsState, handleDelete };
};
