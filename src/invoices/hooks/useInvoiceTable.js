import { apiDelete } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";
import { createSuccessState } from "../../utils/createSuccessState";

/**
 * Custom hook pro správu tabulky faktur.
 * Poskytuje funkci pro mazání faktury z API a aktualizaci lokálního stavu.
 *
 * @hook
 * @param {Array<Object>} items - Seznam faktur aktuálně zobrazených v tabulce.
 * @param {Function} setItems - Funkce pro aktualizaci seznamu faktur.
 * @param {Function} setSuccess - Funkce pro nastavení úspěšného stavu.
 * @returns {(id: string) => Promise<void>} Funkce pro smazání faktury podle ID.
 */
export const useInvoiceTable = (setItems, setSuccess) => {
    const { handleErrors, clearErrors } = useErrorContext();

    /**
     * Odstraní fakturu podle ID z API a aktualizuje lokální stav.
     *
     * @param {string} id - ID faktury, která se má smazat.
     */
    const handleDelete = async (id) => {
        clearErrors();
        if (confirm("Opravdu si přejete smazat fakturu?")) {
            try {
                await apiDelete("/api/invoices/" + id);
                setItems((prev) => prev.filter((item) => item._id != id));
                setSuccess(createSuccessState("Faktura byla úspěšně smazána."));
            } catch (error) {
                handleErrors("Chyba při mazání faktury", error);
            }
        }
    };

    return handleDelete;
};
