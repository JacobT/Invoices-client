import { apiDelete } from "../../utils/api";
import { useErrorContext } from "../../contexts/ErrorContext";

export const useInvoiceTable = (items, setItems) => {
    const { handleErrors, clearErrors } = useErrorContext();

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
