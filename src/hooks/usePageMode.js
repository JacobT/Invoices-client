import { useLocation } from "react-router-dom";

/**
 * Custom hook pro určení režimu stránky (create, show, edit) na základě URL a přítomnosti ID.
 *
 * @hook
 * @param {string|number} id - ID položky; pokud není zadáno, režim je "create".
 * @returns {"create"|"show"|"edit"} Režim stránky: "create", "show" nebo "edit".
 */
export const usePageMode = (id) => {
    const isEdit = useLocation().pathname.includes("/edit/");
    const mode = id ? (isEdit ? "edit" : "show") : "create";

    return mode;
};
