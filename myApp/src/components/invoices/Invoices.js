import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {makeRequest} from '../../services/apiService';
import {LOCAL_STORAGE_KEYS} from "../../constants/common";
import {localStorageGet, localStorageSet} from '../../helpers/helperFunctions';
import Button from '@mui/material/Button';

function Invoices() {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [invoiceLines, setInvoiceLines] = useState([]);
    const [products, setProducts] = useState([]);
    const currentUser = localStorageGet(LOCAL_STORAGE_KEYS.USER_INFO);

    useEffect(() => {
        // get invoices request
        makeRequest.get('invoices')
            .then((response) => {
                const currentUserInvoices = response?.data?.value
                    ?.filter(({UserId}) => UserId === currentUser.UserId);
                setInvoices(currentUserInvoices.map((invoice) => ({
                    ...invoice,
                    collapsed: false
                })));
            })
            .catch((error) => {
                console.log(error);
            });
        // get invoiceLines request
        makeRequest.get('invoicelines')
            .then((response) => {
                setInvoiceLines(response?.data?.value);
            })
            .catch((error) => {
                console.log(error);
            });
        // get products request
        makeRequest.get('products')
            .then((response) => {
                setProducts(response?.data?.value);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    /**
     * Handles expand row functionality
     *
     * @param {string} invoiceId
     */
    const handleInvoiceCollapse = (invoiceId) => () => {
        console.log(invoiceId);
        setInvoices(invoices.map((invoice) => {
            if (invoice.InvoiceId === invoiceId) {
                return {
                    ...invoice,
                    collapsed: !invoice.collapsed
                }
            }
            return {...invoice};
        }))
    }

    /**
     * Handles logout functionality
     *
     */
    const handleLogout = () => {
        navigate('/');
        localStorageSet(LOCAL_STORAGE_KEYS.USER_INFO, {});
    }

    return (
        <div>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            {invoices.map((invoice) => (
                <>
                    <div onClick={handleInvoiceCollapse(invoice.InvoiceId)} style={{color: 'green'}}>
                        <span>{invoice.InvoiceId} ---</span>
                        <span>{invoice.Name} ---</span>
                        <span>{invoice.PaidDate} ---</span>
                        <span>{invoice.UserId}</span>
                    </div>
                    {invoice.collapsed ? (
                        <div>
                            <span>Invoice Lines & Products</span>
                            <div>
                                {invoiceLines.map((invoiceLine) => invoice.InvoiceId === invoiceLine.InvoiceId ? (
                                    <>
                                        <div>
                                            <span>{invoiceLine.InvoiceId} ---</span>
                                            <span>{invoiceLine.InvoiceLineId} ---</span>
                                            <span>{invoiceLine.ProductId} ---</span>
                                            <span>{invoiceLine.Quantity}</span>
                                        </div>
                                        {products.map((product) => product.ProductId === invoiceLine.ProductId ? (
                                            <div style={{color: 'red'}}>
                                                <span>{invoiceLine.Name} ---</span>
                                                <span>{invoiceLine.Price} ---</span>
                                                <span>{invoiceLine.ProductId}</span>
                                            </div>
                                        ) : null)}
                                    </>
                                ) : null)}
                            </div>
                        </div>
                    ) : null}
                </>
            ))}
        </div>
    )
}

export default Invoices;