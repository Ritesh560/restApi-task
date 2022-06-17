import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import Navbar from "../Nevbar/navbar"

const Register = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const register = async () => {
    const { name, email, password, reEnterPassword } = user
    if (name && email && password && password === reEnterPassword) {
      const response = await axios.post("https://login-signup-nodejs.herokuapp.com/register", user)
      if (response.data.errors) alert(response.data.errors[0].msg)
      else {
        alert("success, now you can login.")
        navigate("/login")
      }
    } else {
      alert("No field should empty/password should match.")
    }
  }

  return (
    <div>
      <Navbar />
      <div className="register">
        {console.log("User", user)}
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
        <div className="button" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/login")}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Register
