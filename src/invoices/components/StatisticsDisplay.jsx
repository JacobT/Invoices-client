const StatisticsDisplay = ({ statistics }) => {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col">
                    <p className="mb-0">
                        <strong>Celkový počet faktur: </strong>
                        {statistics.invoicesCount}
                    </p>
                </div>
                <div className="col">
                    <p className="mb-0">
                        <strong>Souhrn příjmů za tento rok: </strong>
                        {statistics.currentYearSum}
                    </p>
                </div>
                <div className="col">
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
