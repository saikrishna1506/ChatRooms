import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://chatrooms-saikrishna.vercel.app/login', {email, password})
        // axios.post('login', {email, password})
        // https://mernbackend-21qk.onrender.com/
        .then(res => {
            console.log("login: " + res.data);
            if(res.data.Status === "Success") {
                if(res.data.role === "admin") {

                    navigate('/dashboard')
                } else {
                    navigate('/home')
                }
            }
            else{
              setErrorMessage("An error occurred: "+res.data)
            }
        }).catch(err => {
          console.log(err)
          setErrorMessage("An error occured: "+err);
        })
    }

    return(
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="bg-white p-3 rounded rounded-sm w-100 max-width-lg">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          </form>
          {errorMessage && (
            <div className='alert alert-danger mt-3'>{errorMessage}</div>
          )}
          <p>Already Have an Account</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Sign Up
          </Link>
        
      </div>
    </div>
    )
}

export default Login;
