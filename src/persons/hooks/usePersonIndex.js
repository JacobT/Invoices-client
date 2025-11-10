import { useState, useEffect } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSuccessState as useSuccessState } from "../../hooks/useSuccessState";

export const usePersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [personsStatistics, setPersonsStatistics] = useState([]);

    const { handleErrors, clearErrors } = useErrorContext();
    const [sentState, setSentState] = useSuccessState("sent");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getPeople = async () => {
            try {
                setPersons(await apiGet("/api/persons"));
            } catch (error) {
                handleErrors("Chyba při načítání osob", error);
            } finally {
                setLoading(false);
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
            } finally {
                setLoading(false);
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

    return {
        persons,
        personsStatistics,
        sentState,
        setSentState,
        isLoading,
        handleDelete,
    };
};
