const express = require("express")
const app = express()
const port = 3001;
const mongoose = require('mongoose')
const UserModel = require("./models/Users")

//this line is to parse the req.body into json format
app.use(express.json());

mongoose.connect("mongodb+srv://reactCapstone:reactCapstone123@cluster0.arz39w1.mongodb.net/capstone_restroom?retryWrites=true&w=majority")


//get users info from database
app.get("/getUsers", (req, res)=>{
    UserModel.find({}, (err, result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

//create a user into database
app.post("/createUser", async (req, res) => {
    const user = req.body   //this user needs to have firstName, lastName, email, password in order to create a new record in db
    const newUser = new UserModel(user)
    await newUser.save()
    res.json(user)
})

app.use(require('./routes/authentication'))

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})