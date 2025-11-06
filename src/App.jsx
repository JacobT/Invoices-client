import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { ErrorProvider } from "./contexts/ErrorContext";
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceDetail from "./invoices/InvoiceDetail";
import ErrorDisplay from "./components/ErrorDisplay";

export function App() {
    return (
        <Router>
            <ErrorProvider>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/persons"} className="nav-link">
                                Osoby
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/invoices"} className="nav-link">
                                Faktury
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="container">
                    <ErrorDisplay />

                    <Routes>
                        <Route index element={<Navigate to={"/persons"} />} />
                        <Route path="/persons">
                            <Route index element={<PersonIndex />} />
                            <Route path="show/:id" element={<PersonDetail />} />
                            <Route path="create" element={<PersonDetail />} />
                            <Route path="edit/:id" element={<PersonDetail />} />
                        </Route>
                        <Route path="/invoices">
                            <Route index element={<InvoiceIndex />} />
                            <Route
                                path="show/:id"
                                element={<InvoiceDetail />}
                            />
                            <Route path="create" element={<InvoiceDetail />} />
                            <Route
                                path="edit/:id"
                                element={<InvoiceDetail />}
                            />
                        </Route>
                    </Routes>
                </div>
            </ErrorProvider>
        </Router>
    );
}

export default App;
