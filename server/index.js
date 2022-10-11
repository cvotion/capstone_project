const express = require("express")
const app = express()
const port = 3001;
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://reactCapstone:reactCapstone123@cluster0.arz39w1.mongodb.net/?retryWrites=true&w=majority")


app.use(require('./routes/authentication'))

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})