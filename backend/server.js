const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config()
const {errorhandler} = require('./middleware/errormiddleware')
const connectdb = require('./config/db')
const port = process.env.PORT || 2000
connectdb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalroutes'))
app.use('/api/users',require('./routes/userroutes'))

app.use(errorhandler)


app.listen(port, () => console.log(`server is running on port ${port}`))