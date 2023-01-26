const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv") 
const bp = require('body-parser')
const cors = require('cors')
dotenv.config()


const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('build'))
const PORT = process.env.PORT || 3001 

const peopleRouter = require('./routes/People')
const infoRouter = require('./routes/Info')

// Mongo DB connection
const database = process.env.URL
mongoose.set('strictQuery', true)
mongoose.connect(database, {  dbName: `phonebook`, useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Succesfully connected to db'))
.catch((err) => console.log(err))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use("/people", peopleRouter)

app.use("/info", infoRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})