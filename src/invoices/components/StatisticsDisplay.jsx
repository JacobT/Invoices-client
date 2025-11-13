/**
 * Komponenta pro zobrazení základních statistických údajů o fakturách.
 *
 * @param {object} props - Vlastnosti komponenty.
 * @param {object} props.statistics - Objekt obsahující statistické údaje.
 * @param {number} props.statistics.invoicesCount - Celkový počet faktur.
 * @param {number} props.statistics.currentYearSum - Souhrn příjmů za aktuální rok.
 * @param {number} props.statistics.allTimeSum - Celkový souhrn příjmů za všechny roky.
 * @returns {JSX.Element} Blok se třemi sloupci zobrazujícími statistiky faktur.
 */
const StatisticsDisplay = ({ statistics }) => {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col centered">
                    <p className="mb-0">
                        <strong>Celkový počet faktur: </strong>
                        {statistics.invoicesCount}
                    </p>
                </div>
                <div className="col centered">
                    <p className="mb-0">
                        <strong>Souhrn příjmů za tento rok: </strong>
                        {statistics.currentYearSum}
                    </p>
                </div>
                <div className="col centered">
                    <p className="mb-0">
                        <strong>Celkový souhrn příjmů: </strong>
                        {statistics.allTimeSum}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsDisplay;
