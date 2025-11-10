const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-auto">
            <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start">
                <small>&copy; {new Date().getFullYear()} Invoices</small>
                <small>
                    Autor:{" "}
                    <a
                        href="mailto:jakubtsch@gmail.com"
                        className="link-light text-decoration-none mt-2 mt-sm-0"
                    >
                        Jakub Tschernoster
                    </a>
                </small>
            </div>
        </footer>
    );
};

export default Footer;
