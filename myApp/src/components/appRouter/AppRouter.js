import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
import App from '../app/App';
import Invoices from '../invoices/Invoices';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path={ROUTES.INVOICES} element={<Invoices />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;