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
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const {id} = useParams()


    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`api/v1/invoices/?patient_id[eq]=${id}&page=${page}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data.data)
                setLastPage(data.meta.last_page)
                setInvoices(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [page])
    }

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

export default Invoices;