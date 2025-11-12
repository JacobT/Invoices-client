import { countryFormatter } from "../../utils/countryFormatter";

/**
 * Komponenta pro zobrazení detailních informací o osobě (dodavatel nebo odběratel) na faktuře.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {object} props.person - Objekt osoby obsahující identifikační a kontaktní údaje.
 * @param {string} props.person.name - Jméno osoby.
 * @param {string} props.person.identificationNumber - IČO (identifikační číslo osoby).
 * @param {string} props.person.taxNumber - DIČ (daňové identifikační číslo).
 * @param {string} props.person.accountNumber - Číslo bankovního účtu.
 * @param {string} props.person.bankCode - Kód banky.
 * @param {string} props.person.iban - IBAN účet.
 * @param {string} props.person.telephone - Telefonní číslo osoby.
 * @param {string} props.person.mail - E-mailová adresa osoby.
 * @param {string} props.person.street - Ulice a číslo popisné.
 * @param {string} props.person.city - Město.
 * @param {string} props.person.zip - PSČ.
 * @param {string} props.person.country - Země.
 * @returns {JSX.Element|null} Blok s údaji o osobě.
 */

const InvoicePersonDetail = ({ person }) => {
    return (
        <div className="person-detail">
            <p>
                <strong>IČO:</strong> {person.identificationNumber}
            </p>
            <p>
                <strong>DIČ:</strong> {person.taxNumber}
            </p>
            <p>
                <strong>Bankovní účet:</strong> {person.accountNumber}/
                {person.bankCode} ({person.iban})
            </p>
            <p>
                <strong>Tel.:</strong> {person.telephone}
            </p>
            <p>
                <strong>Mail:</strong> {person.mail}
            </p>
            <p>
                <strong>Sídlo:</strong> {person.street}, {person.city},{" "}
                {person.zip}, {countryFormatter(person.country)}
            </p>
        </div>
    );
};

export default InvoicePersonDetail;
