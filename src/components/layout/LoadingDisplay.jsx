const LoadingDisplay = ({ small = false }) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div
                className={`spinner-border text-secondary text-opacity-50 m-2${
                    small ? " spinner-border-sm" : ""
                }`}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingDisplay;
