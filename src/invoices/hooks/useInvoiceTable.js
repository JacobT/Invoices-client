import { apiDelete } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";

/**
 * Custom hook pro správu tabulky faktur.
 * Poskytuje funkci pro mazání faktury z API a aktualizaci lokálního stavu.
 *
 * @hook
 * @param {Array<Object>} items - Seznam faktur aktuálně zobrazených v tabulce.
 * @param {Function} setItems - Funkce pro aktualizaci seznamu faktur.
 * @returns {(id: string) => Promise<void>} Funkce pro smazání faktury podle ID.
 */
export const useInvoiceTable = (items, setItems) => {
    const { handleErrors, clearErrors } = useErrorContext();

    /**
     * Odstraní fakturu podle ID z API a aktualizuje lokální stav.
     *
     * @param {string} id - ID faktury, která se má smazat.
     */
    const handleDelete = async (id) => {
        clearErrors();
        try {
            await apiDelete("/api/invoices/" + id);
            setItems(items.filter((item) => item._id != id));
        } catch (error) {
            handleErrors("Chyba při mazání faktury", error);
        }
    };

    return handleDelete;
};
