import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import { apiGet, apiPost, apiPut } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { dateStringFormatter } from "../utils/dateStringFormatter";

const InvoiceForm = () => {
    const navigate = useNavigate();
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

    const [people, setPeople] = useState([]);

    useEffect(() => {
        if (id) {
            const getInvoice = async () => {
                const invoice = await apiGet("/api/invoices/" + id);
                setInvoice(invoice);
            };
            getInvoice();
        }
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            const data = await apiGet("/api/persons");
            setPeople(data);
        };
        getData();
    }, []);

    // useEffect(() => {
    //     console.log("buyer", invoice.buyer, "seller", invoice.seller);
    // }, [invoice]);

    // useEffect(() => {
    //     console.log(people);
    // }, [people]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "buyer" || name === "seller") {
            setInvoice((prev) => ({
                ...prev,
                [name]: {
                    _id: value,
                },
            }));
            return;
        }

        setInvoice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(invoice);

        if (id) {
            await apiPut("/api/invoices/" + id, invoice);
        } else {
            await apiPost("/api/invoices", invoice);
        }

        navigate("/invoices");
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit novou"} fakturu:</h1>

            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    prompt="Zadejte datum"
                    value={dateStringFormatter(invoice.issued)}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum"
                    value={dateStringFormatter(invoice.dueDate)}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Název produktu"
                    prompt="Produkt"
                    value={invoice.product}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    prompt="Uveďte procento DPH"
                    value={invoice.vat}
                    handleChange={handleChange}
                />

                <InputField
                    required={false}
                    type="textarea"
                    name="note"
                    label="Poznámka"
                    rows="3"
                    value={invoice.note}
                    handleChange={handleChange}
                />

                <InputSelect
                    label={"Prodejce"}
                    name={"buyer"}
                    items={people}
                    required={true}
                    value={invoice.buyer._id}
                    handleChange={handleChange}
                    prompt={"Vyberte prodejce..."}
                />

                <InputSelect
                    label={"Odběratel"}
                    name={"seller"}
                    items={people}
                    required={true}
                    value={invoice.seller._id}
                    handleChange={handleChange}
                    prompt={"Vyberte odběratele..."}
                />

                <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Uložit"}
                />
            </form>
        </div>
    );
};

export default InvoiceForm;
