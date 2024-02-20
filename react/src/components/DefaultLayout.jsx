import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axios from 'axios';
import axiosClient from "../axios-client.js";


const DefaultLayout = () => {
    const {user, token, notification, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axios({
            url: 'http://localhost:8001/logout',
            // data: data,
            method: "POST",
            mode: 'no-cors',
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
              // "Access-Control-Request-Headers": 'Content-Type, Authorization'
            }
          }) 
          .then(res => {
            console.log(res)
            setUser(null)
            setToken(null);
            alert("Successfully logged out!");
          })
          .catch(err => {
            console.log(err);
            alert("Did not log out!");
    
            const response = err.response;
            if (response && response.status == 422) {
              setErrors(response.data.errors)
            }
          })
    }



    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
        }, [])



    return (
        <div id="defaultLayout">
            {/* <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/patients">Patients</Link>
            </aside> */}
            <div className="content">
                <header>
                    <Link to="/patients" style={{textDecoration: 'none'}}>
                        <h1>Home</h1>
                    </Link>
                    <div>
                        {user.name}
                        &nbsp;
                        <a href="#" onClick={onLogout} className="btn-logout" style={{margin: '1rem'}}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && <div className="notification">
                {notification}
            </div>
            }   
        </div>
    )
};

export default DefaultLayout;