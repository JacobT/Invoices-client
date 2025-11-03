import { countryFormatter } from "../../utils/countryFormatter";

const InvoicePersonDetail = ({ person }) => {
    if (!person || !person.name) return null;

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
