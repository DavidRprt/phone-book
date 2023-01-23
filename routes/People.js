const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Person = require("../models/person")

router.get('/', async (req, res) => {
  const contactList = await Person.find()
  console.log(contactList)
  res.status(200).json(contactList) 
  })

router.post('/', async (req, res) => {
  const requestData = req.body
  console.log(requestData)
  const newPerson = new Person({
    "name": requestData.name,
    "number": requestData.number
})
  await newPerson.save().then(result => {
    console.log('Contact saved!')
}) 
  res.status(201).json(newPerson) 
  })

module.exports = router