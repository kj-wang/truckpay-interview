import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useParams } from "react-router-dom";

// http://localhost:8001/api/v1/invoices?patient_id[eq]=123
// sample api call

const Invoices = () => {
    // const [invoices, setInvoices] = useState({
    //     id: null,
    //     patientId: '',
    //     amount: '',
    //     status: '',
    //     billedDate: '',
    //     paidDate: '',
    // })
    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(false);
    const {id} = useParams()

    // useEffect(() => {
    //     getinvoices();
    // }, [])


    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`api/v1/invoices/?patient_id[eq]=${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data.data)
                setInvoices(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    }

    // const getinvoices = () => {
    //     setLoading(true);
    //     axiosClient.get('api/v1/invoices?includeInvoices=true')
    //         .then(({data}) => {
    //             setLoading(false);
    //             console.log(data);
    //             setInvoices(data.data)
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         })
    // }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Invoices</h1>
                <Link to={"/invoices/new/"+id} className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Billed Date</th>
                            <th>Paid Date</th>
                        </tr>
                    </thead>

                    {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="7" className="text-center">Loading...</td>
                        </tr>
                    </tbody>
                    }

                        <tbody>
                            {invoices.map(u => (
                                <tr>
                                    <td>{u.patientId}</td>
                                    <td>{u.id}</td>
                                    <td>{u.amount}</td>
                                    <td>{u.status}</td>
                                    <td>{u.billedDate}</td>
                                    <td>{u.paidDate}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
};

export default Invoices;