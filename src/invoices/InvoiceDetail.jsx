import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "../persons/Country";
import dateStringFormatter from "../utils/dateStringFormatter";
import "./InvoiceDetail.css";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        product: "",
        price: "",
        vat: "",
        note: "",
        buyer: {
            _id: "",
        },
        seller: {
            _id: "",
        },
    });

    useEffect(() => {
        const getInvoice = async () => {
            const response = await apiGet("/api/invoices/" + id);
            setInvoice(response);
        };
        getInvoice();
    }, []);

    const country =
        Country.CZECHIA === invoice.seller.country
            ? "Česká republika"
            : "Slovensko";

    return (
        <div>
            <h1>Faktura č.{invoice.invoiceNumber}</h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <h4>Dodavatel:</h4>
                    <h5>{invoice.seller.name}</h5>
                    <p>
                        <strong>IČO:</strong>{" "}
                        {invoice.seller.identificationNumber}
                    </p>
                    <p>
                        <strong>DIČ:</strong> {invoice.seller.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>{" "}
                        {invoice.seller.accountNumber}/{invoice.seller.bankCode}{" "}
                        ({invoice.seller.iban})
                    </p>
                    <p>
                        <strong>Tel.:</strong> {invoice.seller.telephone}
                    </p>
                    <p>
                        <strong>Mail:</strong> {invoice.seller.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong> {invoice.seller.street},{" "}
                        {invoice.seller.city}, {invoice.seller.zip}, {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong> {invoice.seller.note}
                    </p>
                </div>
                <div className="col-6">
                    <h4>Odběratel:</h4>
                    <h5>{invoice.buyer.name}</h5>
                    <p>
                        <strong>IČO:</strong>{" "}
                        {invoice.buyer.identificationNumber}
                    </p>
                    <p>
                        <strong>DIČ:</strong> {invoice.buyer.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>{" "}
                        {invoice.buyer.accountNumber}/{invoice.buyer.bankCode} (
                        {invoice.buyer.iban})
                    </p>
                    <p>
                        <strong>Tel.:</strong> {invoice.buyer.telephone}
                    </p>
                    <p>
                        <strong>Mail:</strong> {invoice.buyer.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong> {invoice.buyer.street},{" "}
                        {invoice.buyer.city}, {invoice.buyer.zip}, {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong> {invoice.buyer.note}
                    </p>
                </div>
            </div>
            <hr />
            <div className="row pb-3">
                <div className="col-6 text-center">
                    <p>
                        <strong>Datum vydání:</strong>{" "}
                        {dateStringFormatter(invoice.issued, true)}
                    </p>
                </div>
                <div className="col-6 text-center">
                    <p>
                        <strong>Datum splatnosti:</strong>{" "}
                        {dateStringFormatter(invoice.dueDate, true)}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Položka:</th>
                                <th>Cena:</th>
                                <th>DPH:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{invoice.product}</td>
                                <td>{invoice.price}</td>
                                <td>{invoice.vat}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {invoice.note}
                </p>
            </div>
        </div>
    );
};

export default InvoiceDetail;
