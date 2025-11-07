import InputField from "../../components/inputs/InputField";
import InputSelect from "../../components/inputs/InputSelect";
import { useInvoiceFilter } from "../hooks/useInvoiceFilter";

const InvoiceFilter = ({ showFilter, setInvoices }) => {
    const { filter, people, handleChange, resetFilter, applyFilter } =
        useInvoiceFilter(setInvoices);

    if (!showFilter) return null;

    return (
        <>
            <hr />
            <form className="container narrow-container">
                <div className="row">
                    <div className="col-6">
                        <InputField
                            type={"number"}
                            name={"invoiceNumber"}
                            label={"Číslo faktury"}
                            prompt={"Číslo faktury"}
                            value={filter.invoiceNumber}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputSelect
                            name={"sellerId"}
                            label={"Dodavatel"}
                            items={people}
                            value={filter.sellerId}
                            handleChange={handleChange}
                            prompt={"Vyberte dodavatele..."}
                        />
                    </div>
                    <div className="col-6">
                        <InputSelect
                            name={"buyerId"}
                            label={"Odběratel"}
                            items={people}
                            value={filter.buyerId}
                            handleChange={handleChange}
                            prompt={"Vyberte odběratele..."}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputField
                            type={"date"}
                            name={"fromDate"}
                            label={"Datum vydání od"}
                            prompt={"od"}
                            value={filter.fromDate}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="col-6">
                        <InputField
                            type={"date"}
                            name={"toDate"}
                            label={"Datum vydání do"}
                            prompt={"do"}
                            value={filter.toDate}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputField
                            type={"number"}
                            name={"fromPrice"}
                            label={"Cena od"}
                            prompt={"od"}
                            value={filter.fromPrice}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="col-6">
                        <InputField
                            type={"number"}
                            name={"toPrice"}
                            label={"Cena do"}
                            prompt={"do"}
                            value={filter.toPrice}
                            handleChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <InputField
                            type={"number"}
                            name={"limit"}
                            label={"Limit"}
                            prompt={""}
                            value={filter.limit}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-end gap-2">
                        <input
                            type="button"
                            className="btn btn-danger"
                            value="Reset"
                            onClick={resetFilter}
                        />
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Filtrovat"
                            onClick={applyFilter}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default InvoiceFilter;
