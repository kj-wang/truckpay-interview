import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

const PatientsForm = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setNotification} = useStateContext()
    const [patient, setPatient] = useState({
        id: null,
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        type: '',
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`api/v1/patients/${id}`)
            .then(({data}) => {
                setLoading(false)
                setPatient(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (patient.id) {
            axiosClient.put(`/api/v1/patients/${patient.id}`, patient)
            .then(() => {
                setNotification("User was successfully updated")
                // show notification
                navigate('/patients')
            })
            .catch(err => {
                console.log(err);
                // alert("Did not update properly!");
                // alert(err.response.data.errors);
        
                const response = err.response;
                if (response && response.status == 422) {
                  setErrors(response.data.errors)
                }

              alert(response.data.message)

            })
        } else {
            axiosClient.post(`/api/v1/patients/`, patient)
            .then(() => {
                // show notification
                setNotification("User was successfully created")
                navigate('/patients')
            })
            .catch(err => {
                console.log(err);
                // alert("Did not create properly!");)
        
                const response = err.response;

                alert(response.data.message);

                if (response && response.status == 422) {
                  setErrors(response.data.errors)
                }
            })
        }

    }

    return (
        <>
        {patient.id && <h1>Update Patient: {patient.name}</h1>}
        {!patient.id && <h1>New Patient</h1>}
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
            <input value={patient.name} onChange={ev => setPatient({...patient, name: ev.target.value})} placeholder="Name"/>
            <input type="email" value={patient.email} onChange={ev => setPatient({...patient, email: ev.target.value})} placeholder="Email"/>
            <input value={patient.address} onChange={ev => setPatient({...patient, address: ev.target.value})} placeholder="Address"/>
            <input value={patient.city} onChange={ev => setPatient({...patient, city: ev.target.value})} placeholder="City"/>
            <input value={patient.state} onChange={ev => setPatient({...patient, state: ev.target.value})}placeholder="State"/>
            <input value={patient.postalCode} onChange={ev => setPatient({...patient, postalCode: ev.target.value})}placeholder="Postal Code"/>
            <input value={patient.type} onChange={ev => setPatient({...patient, type: ev.target.value})} placeholder="Type"/>
            <button className="btn">Save</button>
          </form>
        }
        </div>
        </>
    )
};

export default PatientsForm;