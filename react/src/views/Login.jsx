import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";


const Login = () => {

    const emailRef = createRef()
    const passwordRef = createRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = (ev) => {
        ev.preventDefault()

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }

          setErrors(null);
        
          axios({
              url: 'http://localhost:8001/login',
              data: data,
              method: "POST",
            //   mode: 'no-cors',
              headers: {
                "Content-Type": "application/json",
                // "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Request-Headers": 'Content-Type, Authorization'
              }
            }) 
            .then(res => {
              console.log(res)
              const currToken = res.data;
              setUser(currToken.user)
              setToken(currToken.token);
      
              console.log(`this is user:  ${currToken.user}`)
              console.log(`this is token: ${currToken.token}`)
              alert("Successful login!");
            })
            .catch(err => {
              console.log(err);
                console.log(data)
      
              const response = err.response;
              if (response && response.status == 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    setErrors({
                        email: [response.data.message]
                    })
                }
              }

              alert(response.data.error)
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
            }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;