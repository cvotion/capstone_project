const express = require("express")
const app = express()
const port = 3001;
const mongoose = require('mongoose')
const UserModel = require("./models/Users")
const FavoriteModel = require('./models/Favorites');
const databaseInfo = require('./secret');
console.log(databaseInfo);

//this line is to parse the req.body into json format
app.use(express.json());

mongoose.connect(databaseInfo.connect)


//get users info from database
app.get("/getUsers", (req, res)=>{
    UserModel.findOne({}, (err, result)=>{
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

//create a fav spot into database
app.post('/createFavspot', async (req, res)=>{
    const favSpot = req.body //this favspot needs to have user_id, name, street, city, state
    const newFavSpot = new FavoriteModel(favSpot)
    await newFavSpot.save()
    res.json(favSpot)
})

//get fav spots from database
app.get("/getFavSpots", (req, res)=>{
    FavoriteModel.find({}, (err, result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })

})

app.use(require('./routes/authentication'))

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})