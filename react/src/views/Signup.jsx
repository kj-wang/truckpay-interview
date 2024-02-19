import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axios from 'axios';

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const [permissions, setPermissions] = useState([]);

  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  // const signupApiEndpoint = '/api/v1/signup'

  const handleChange = (ev) => {
    const { checked, value } = event.target;

    if (checked) {
      setPermissions((prevPermissions) => [...prevPermissions, value]);
    } else {
      setPermissions((prevPermissions) => prevPermissions.filter((perm) => perm !== value));
    }
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      permissions: permissions
    }
  
    axios({
        url: 'http://localhost:8001/signup',
        data: data,
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Request-Headers": 'Content-Type, Authorization'
        }
      }) 
      .then(res => {
        console.log(res);
        alert("Successfully signed up!");
      })
      .catch(err => {
        console.log(err)
        alert("Did not sign up!");
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>

          <div>
            <input 
              type="checkbox" 
              value="create"
              checked={permissions.includes('create')}
              onChange={handleChange}
              /> Create
          </div>

          <div>
            <input 
              type="checkbox" 
              value="view"
              checked={permissions.includes('view')}
              onChange={handleChange}
              /> View
          </div>

          <div>
            <input 
              type="checkbox" 
              value="update"
              checked={permissions.includes('update')}
              onChange={handleChange}
              /> Update
          </div>

          <div>
            <input 
              type="checkbox" 
              value="doctor:create"
              checked={permissions.includes('doctor:create')}
              onChange={handleChange}
              /> Doctor Create
          </div>

          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}