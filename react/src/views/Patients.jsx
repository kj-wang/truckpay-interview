import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPatients();
    }, [])

    const getPatients = () => {
        setLoading(true);
        axiosClient.get('api/v1/patients?includeInvoices=true')
            .then(({data}) => {
                setLoading(false);
                console.log(data);
                setPatients(data.data)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Patients</h1>
                <Link to="/patients/new" className="btn-add">Add New</Link>
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
                            {patients.map(u => (
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
                                        <Link className="btn-edit" to={'/patients/'+u.id}>Edit</Link>
                                        &nbsp;
                                        {/* <button className="btn-delete">Invoices</button> */}
                                        <Link className="btn-delete" to={'/patients/'+u.id}>Invoices</Link>
                                        &nbsp;
                                        <Link className="btn-add" to={'/patients/'+u.id}>Charts</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
};

export default Patients;