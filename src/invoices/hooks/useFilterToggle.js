import { useState } from "react";

/**
 * @typedef {Object} FilterToggleReturn
 * @property {boolean} showFilter - Stav zobrazení filtru.
 * @property {() => void} toggleFilter - Funkce pro přepínání zobrazení filtru.
 */

/**
 * Custom hook pro správu zobrazení filtru.
 *
 * @hook
 * @returns {FilterToggleReturn} Objekt obsahující stav filtru a funkci pro jeho přepínání.
 */
export const useFilterToggle = () => {
    const [showFilter, setShowFilter] = useState(false);

    /**
     * Přepíná stav zobrazení filtru.
     */
    const toggleFilter = () => setShowFilter(!showFilter);

    return { showFilter, toggleFilter };
};
