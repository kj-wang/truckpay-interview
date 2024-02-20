import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

// http://localhost:8001/api/v1/invoices?patient_id[eq]=123
// sample api call

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getinvoices();
    }, [])

    const getinvoices = () => {
        setLoading(true);
        axiosClient.get('api/v1/invoices?includeInvoices=true')
            .then(({data}) => {
                setLoading(false);
                console.log(data);
                setInvoices(data.data)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>invoices</h1>
                <Link to="/invoices/new" className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Postal Code</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="9" className="text-center">Loading...</td>
                        </tr>
                    </tbody>
                    }

                        <tbody>
                            {invoices.map(u => (
                                <tr>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.address}</td>
                                    <td>{u.city}</td>
                                    <td>{u.state}</td>
                                    <td>{u.postalCode}</td>
                                    <td>{u.type}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/invoices/'+u.id}>Edit</Link>
                                        &nbsp;
                                        {/* <button className="btn-delete">Invoices</button> */}
                                        <Link className="btn-delete" to={'/invoices/'+u.id}>Invoices</Link>
                                        &nbsp;
                                        <Link className="btn-add" to={'/invoices/'+u.id}>Charts</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
};

export default invoices;