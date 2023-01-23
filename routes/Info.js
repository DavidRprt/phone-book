const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Person = require("../models/person")

router.get('/', (request, response) => {
    Person.count({}, function( err, count){
        if (err) response.json(`Error: ${err}`)
        else response.json(`There are ${count} contacts in your list`)
    })
  })

  module.exports = router