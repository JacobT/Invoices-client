/**
 * Formátuje datum z řetězce na čitelný formát.
 *
 * @param {string|Date} date - Datum jako řetězec nebo objekt Date.
 * @param {boolean} [locale=false] - Pokud true, vrátí datum ve formátu "dd. měsíc yyyy" podle české lokalizace.
 * @returns {string} Naformátovaný datum buď ve tvaru "yyyy-mm-dd" nebo lokalizovaném formátu.
 *
 * @example
 * dateStringFormatter("2025-11-12"); // "2025-11-12"
 * dateStringFormatter("2025-11-12", true); // "12. listopadu 2025"
 */
export const dateStringFormatter = (date, locale = false) => {
    const d = new Date(date);

    if (locale) {
        return d.toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const year = d.getFullYear();
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();

    return [
        year,
        month.length < 2 ? "0" + month : month,
        day.length < 2 ? "0" + day : day,
    ].join("-");
};

export default dateStringFormatter;
