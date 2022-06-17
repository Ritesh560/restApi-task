const express = require("express")
const router = express.Router()

//validatior and bcrypt for authetentication
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

//jwt for token generation
const jwt = require("jsonwebtoken")
const config = require("config")

//importing models
const User = require("../models/user")
const { request } = require("express")

router.post("/", [check("email", "please Enter a valid email.").isEmail(), check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (user) {
      return res.status(200).json({ errors: [{ msg: "user already exists." }] })
    }

    user = new User({
      email,
      password,
      name: req.body.name,
    })

    //hashing the password
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    return res.status(200).json({ msg: "account created successfully.", user })
  } catch (err) {
    console.log(err)
    return req.status(200).send(err)
  }
})

module.exports = router
