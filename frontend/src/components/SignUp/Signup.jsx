import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

    const navigate = useNavigate()
axios.defaults.withCredentials=true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://chatrooms-saikrishna.vercel.app/register', {name, email, password})
        // https://mernbackend-21qk.onrender.com/

        .then(res => {
            navigate('/login')
        }).catch(err => {
          console.log(err)
          setErrorMessage("An error occurred: " + err.message); // Set error message
        })
    }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="bg-white p-3 rounded rounded-sm w-100 max-width-lg">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
          </form>
          {errorMessage && 
          (<div className="alert alert-danger mt-3">{errorMessage}</div>)
          }
          <p>Already Have an Account</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        
      </div>
    </div>
  );
}

export default Signup;
