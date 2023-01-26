const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const Person = require("../models/person")

router.get('/', async (req, res) => {
  const contactList = await Person.find()
  console.log(contactList)
  res.status(200).json(contactList) 
  })

router.get('/:id', (req, res) => {
  const contactId = req.params.id
  const singleContact = Person.findById(contactId)
  .then(response => {
    res.status(200).json(response)
    console.log("Contact was found")
  })
  .catch(err => {
    res.status(404).send("Contact not found")
    console.log(err)
  })
  
  })

router.post('/', async (req, res) => {
  const requestData = req.body
  console.log(requestData)
  if (requestData.name.length < 3) {
    res.status(403).send("The name should be at least 3 letters long")
  }

  else {
    const newPerson = new Person({
      "name": requestData.name,
      "number": requestData.number
    })
    await newPerson.save().then(result => {
      console.log('Contact saved!')
    }) 
    res.status(201).json(newPerson)
    } 
  })


router.delete('/:id', (req, res) => {
  const contactId = req.params.id
  const singleContact = Person.findByIdAndRemove(contactId)
  .then(response => {
    res.status(200).json(response)
    console.log("Contact was deleted")
  })
  .catch(err => {
    res.status(404).send("Contact not found")
    console.log(err)
  })
}) 


module.exports = router