import { useLocation } from "react-router-dom";

export const usePageMode = (id) => {
    const isEdit = useLocation().pathname.includes("/edit/");
    const mode = id ? (isEdit ? "edit" : "show") : "create";

    return mode;
};
