import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

const InvoicesForm = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {setNotification} = useStateContext()
    const [invoice, setInvoice] = useState({
            patientId: parseInt(id),
            amount: null,
            status: '',
            billedDate: null,
            paidDate: null,
        })

    const onSubmit = (ev) => {
        ev.preventDefault()
            axiosClient.post(`/api/v1/invoices/bulk`, [invoice])
            .then(() => {
                // show notification
                setNotification("Invoice was successfully created")
                navigate('/invoices/'+id)
            })
            .catch(err => {
                console.log(err);
                console.log(invoice);
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
        <h1>New Invoice</h1>
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
            <input onChange={ev => setInvoice({...invoice, amount: parseInt(ev.target.value)})} placeholder="Amount"/>
            <input onChange={ev => setInvoice({...invoice, status: ev.target.value})} placeholder="Status"/>
            <input onChange={ev => setInvoice({...invoice, billedDate: ev.target.value})} placeholder="Billed Date (YYYY-MM-DD HH:MM:SS)"/>
            <input onChange={ev => setInvoice({...invoice, paidDate: ev.target.value})} placeholder="Paid Date (YYYY-MM-DD HH:MM:SS)"/>
            <button className="btn">Save</button>
          </form>
        }
        </div>
        </>
    )
};

export default InvoicesForm;