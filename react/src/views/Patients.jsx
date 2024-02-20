import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        getPatients();
    }, [page])

    const getPatients = () => {
        setLoading(true);
        axiosClient.get('api/v1/patients?page='+page)
            .then(({data}) => {
                setLoading(false);
                setLastPage(data.meta.last_page)
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
                                        <Link className="btn-delete" to={'/invoices/'+u.id}>Invoices</Link>
                                        &nbsp;
                                        <Link className="btn-add" to={'/charts/'+u.id}>Charts</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14'}}>
                        <button onClick={() => setPage(1)} className="btn-logout" style={{padding: "0.3rem 0.3rem", margin: "0.2rem"}}>First Page</button>
                        <button onClick={() => { if (page > 1) setPage(page - 1) }} className="btn-logout" style={{padding: "0.3rem 0.3rem", margin: "0.2rem"}}>Previous Page</button>
                        <div className="center" style={{padding: '20px 20px', fontSize: '14'}}>{page}</div>
                        <button onClick={() => { if (page < lastPage) setPage(page + 1) }} className="btn-logout" style={{padding: "0.3rem 0.3rem", margin: "0.2rem"}}>Next Page</button>
                        <button onClick={() => setPage(lastPage)} className="btn-logout" style={{padding: "0.3rem 0.3rem", margin: "0.2rem"}}>Last Page</button>
                    </div>
            </div>
        </div>
    )
};

export default Patients;