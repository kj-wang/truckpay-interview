import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useParams } from "react-router-dom";

// http://localhost:8001/api/v1/charts?patient_id[eq]=123
// sample api call

// "id": 221,
// "patientId": 23,
// "treatable": "Y",
// "prescriptions": 6,
// "visitDate": "2019-06-27 19:51:16"

const Charts = () => {
    const [charts, setCharts] = useState([]);

    const [loading, setLoading] = useState(false);
    const {id} = useParams()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`api/v1/charts/?patient_id[eq]=${id}`)
            .then(({data}) => {
                setLoading(false)
                console.log(data.data)
                setCharts(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>charts</h1>
                <Link to={"/charts/new/"+id} className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>ID</th>
                            <th>Treatable</th>
                            <th>Prescriptions</th>
                            <th>Visit Date</th>
                        </tr>
                    </thead>

                    {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">Loading...</td>
                        </tr>
                    </tbody>
                    }

                        <tbody>
                            {charts.map(u => (
                                <tr>
                                    <td>{u.patientId}</td>
                                    <td>{u.id}</td>
                                    <td>{u.treatable}</td>
                                    <td>{u.prescriptions}</td>
                                    <td>{u.visitDate}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    )
};

export default Charts;
