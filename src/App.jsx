import { BrowserRouter as Router, Routes } from "react-router-dom";

import { ErrorProvider } from "./contexts/ErrorContext";
import Navbar from "./components/layout/Navbar";
import ErrorDisplay from "./components/notification/ErrorDisplay";
import Footer from "./components/layout/Footer";
import personRoutes from "./routes/PersonRoutes";
import invoiceRoutes from "./routes/InvoiceRoutes";

export function App() {
    return (
        <Router>
            <ErrorProvider>
                <div className="d-flex flex-column min-vh-100">
                    <Navbar />

                    <main className="container py-4 flex-grow-1">
                        <ErrorDisplay />

                        <Routes>
                            {personRoutes}
                            {invoiceRoutes}
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </ErrorProvider>
        </Router>
    );
}

export default App;
