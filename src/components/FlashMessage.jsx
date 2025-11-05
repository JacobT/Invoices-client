export const FlashMessage = ({ theme, text }) => {
    return (
        <div
            className={
                "alert text-center my-4 alert-dismissible alert-" + theme
            }
            role="alert"
        >
            <strong>{text}</strong>
            <button
                type="button"
                className="btn-close"
                onClick={hideAlert}
            ></button>
        </div>
    );
};

const hideAlert = (e) => {
    e.preventDefault();

    const alert = e.target.parentNode;
    alert.classList.add("d-none");
};

export default FlashMessage;
