const express = require("express")
const router = express.Router()

//validatior and bcrypt for authetentication
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

//importing models
const User = require("../models/user")

router.post("/", [check("email", "please Enter a valid email.").isEmail(), check("password", "Password is required.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(200).send({ errors: [{ msg: "User does not exist." }] })
    }

    //authenticating password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(200).send({ errors: [{ msg: "Invalid credentials" }] })
    }

    return res.status(200).send(user)
  } catch (err) {
    console.log(err)
    res.status(200).send(err)
  }
})

module.exports = router
