import { Route, Navigate } from "react-router-dom";
import PersonIndex from "../persons/PersonIndex";
import PersonDetail from "../persons/PersonDetail";

/**
 * React Router DOM routes pro správu osob.
 *
 * @type {JSX.Element}
 */
const personRoutes = (
    <>
        <Route index element={<Navigate to={"/persons"} />} />
        <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonDetail />} />
            <Route path="edit/:id" element={<PersonDetail />} />
        </Route>
    </>
);

export default personRoutes;
