/**
 * Vytvoří objekt se stavem úspěchu pro notifikace.
 *
 * @param {string} message - Text zprávy, která bude zobrazena jako úspěch.
 * @returns {Object} Objekt obsahující vlastnost successMessage: {string} message
 */
export const createSuccessState = (message) => {
    return {
        successMessage: message,
    };
};
