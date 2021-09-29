const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())


app.use('/auth',require('./routes/auth'))
app.use('/vacation',require('./routes/vacations'))



app.listen(2225,()=>{console.log('Server is Running on:2225')})
