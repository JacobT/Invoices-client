const API_URL = "https://localhost:7071";

/**
 * Chyba při volání API s informací o HTTP odpovědi a zprávě.
 */
export class ApiRequestError extends Error {
    /**
     * @param {Response} response - Objekt HTTP odpovědi z fetch.
     * @param {string} message - Text chyby vrácený serverem.
     */
    constructor(response, message) {
        super(
            `There was error when fetching data ${response.status} - ${message}`
        );
        this.response = response;
        this.message = message;
    }
}

/**
 * Interní funkce pro volání fetch s kontrolou chyb.
 *
 * @param {string} url - URL požadavku.
 * @param {RequestInit} requestOptions - Konfigurace fetch requestu.
 * @returns {Promise<any>} Data z JSON odpovědi (pokud nejde o DELETE).
 * @throws {ApiRequestError} Pokud odpověď není OK.
 */
const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    return fetch(apiUrl, requestOptions)
        .then(async (response) => {
            if (!response.ok) {
                const message = await response.text();
                throw new ApiRequestError(response, message);
            }

            if (requestOptions.method !== "DELETE") return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Volání GET na API s volitelnými parametry query.
 *
 * @param {string} url - Cesta k API.
 * @param {Object} [params] - Objekt parametrů pro query string.
 * @returns {Promise<any>} JSON data z odpovědi.
 */
export const apiGet = (url, params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};

/**
 * Volání POST na API.
 *
 * @param {string} url - Cesta k API.
 * @param {Object} data - Data k odeslání v těle requestu.
 * @returns {Promise<any>} JSON data z odpovědi.
 */
export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

/**
 * Volání PUT na API.
 *
 * @param {string} url - Cesta k API.
 * @param {Object} data - Data k odeslání v těle requestu.
 * @returns {Promise<any>} JSON data z odpovědi.
 */
export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

/**
 * Volání DELETE na API.
 *
 * @param {string} url - Cesta k API.
 * @returns {Promise<void>} Žádný návratový objekt.
 */
export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
    };

    return fetchData(url, requestOptions);
};
