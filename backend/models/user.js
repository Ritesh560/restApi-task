const { Int32 } = require("mongodb")
const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = User = mongoose.model("users", useSchema)
