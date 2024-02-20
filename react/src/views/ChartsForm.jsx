import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

const ChartsForm = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setNotification} = useStateContext()
    const [chart, setChart] = useState({
            patientId: parseInt(id),
            treatable: '',
            prescriptions: null,
            visitDate: null,
        })

    const onSubmit = (ev) => {
        ev.preventDefault()
            axiosClient.post(`/api/v1/charts/bulk`, [chart])
            .then(() => {
                // show notification
                setNotification("Chart was successfully created")
                navigate('/charts/'+id)
            })
            .catch(err => {
                console.log(err);
                console.log(chart);
                // debugger
                // alert("Did not create properly!");)
        
                const response = err.response;
                if (response && response.status == 422) {
                  setErrors(response.data.errors)
                }

                alert(response.data.message)
            })

    }

    return (
        <>
        <h1>New Chart</h1>
        <div className="card animated fadeInDown">
            {loading && (
                <div className="text-center">Loading...</div>
            )}
            {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          {!loading && <form onSubmit={onSubmit}>
            <input onChange={ev => setChart({...chart, treatable: ev.target.value})} placeholder="Treatable"/>
            <input onChange={ev => setChart({...chart, prescriptions: parseInt(ev.target.value)})} placeholder="Prescriptions"/>
            <input onChange={ev => setChart({...chart, visitDate: ev.target.value})} placeholder="Visit Date (YYYY-MM-DD HH:MM:SS)"/>
            <button className="btn">Save</button>
          </form>
        }
        </div>
        </>
    )
};

export default ChartsForm;