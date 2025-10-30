export const Country = Object.freeze({
    CZECHIA: "CZECHIA",
    SLOVAKIA: "SLOVAKIA",
});

export const countryFormatter = (country) => {
    return Country.CZECHIA === country ? "Česká republika" : "Slovensko";
};

export default countryFormatter;
