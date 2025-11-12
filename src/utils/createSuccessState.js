/**
 * Vytvoří objekt se stavem úspěchu pro notifikace.
 *
 * @param {string} stateName - Název stavu, který bude použit jako klíč v objektu.
 * @param {string} message - Text zprávy, která bude zobrazena jako úspěch.
 * @returns {Object} Objekt obsahující klíč podle `stateName` s vlastnostmi:
 *   - success: {boolean} vždy true
 *   - message: {string} zadaná zpráva
 */
export const createSuccessState = (stateName, message) => {
    return {
        [stateName]: {
            success: true,
            message: message,
        },
    };
};
