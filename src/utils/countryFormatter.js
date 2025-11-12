/**
 * Enum pro podporované země.
 * @readonly
 * @enum {string}
 */
export const Country = Object.freeze({
    CZECHIA: "CZECHIA",
    SLOVAKIA: "SLOVAKIA",
});

/**
 * Převádí hodnotu z enumu `Country` na čitelný název země.
 *
 * @param {string} country - Hodnota z enumu `Country`.
 * @returns {string} Název země v českém jazyce.
 *
 * @example
 * countryFormatter(Country.CZECHIA); // "Česká republika"
 * countryFormatter(Country.SLOVAKIA); // "Slovensko"
 */
export const countryFormatter = (country) => {
    return Country.CZECHIA === country ? "Česká republika" : "Slovensko";
};

export default countryFormatter;
