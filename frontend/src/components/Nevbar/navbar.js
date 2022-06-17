import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar() {
  return (
    <div className="Navbar">
      <Link className="Links" to="/">
        Home
      </Link>
      <Link className="Links" to="login">
        Login
      </Link>
      <Link className="Links" to="/register">
        Register
      </Link>
    </div>
  )
}

export default Navbar
