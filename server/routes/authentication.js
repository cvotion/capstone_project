const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const UserModel = require("../models/Users")
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret1 = require('../secrect1');
const FavoriteModel = require('../models/Favorites');


//must initialize passport for it work
router.use(passport.initialize())


//impor all fo the passAuth code form ../auth/passAuth.js file
require('../auth/passAuth')

router.use(express.urlencoded({extended: false})) // scrape email and pwd from request header 
router.use(express.json())  //req.body

//*call authenticate method on passport instance
//* this is our gatekeeper middleware
let requireLogin = passport.authenticate('local', {session:false})
let requireJwt = passport.authenticate('jwt', {session:false})

//this function returns a JWT
// {id, email, password, createdAt, updatedAt}

const token = (userRecord) => {
    let timestamp = new Date().getTime(); //current time in ms
    return jwt.encode({sub:userRecord.id, iat:timestamp}, secret1.secrets)
}


router.get('/', (req, res)=>{
    res.send('Hello World')
})


// when react sends us info from its form, we're going 
// 1. register user 
// 2. send back a jwt

router.post('/register', async (req, res)=>{

    //collect info from the header 
    //email, password
    console.log("inside register route")

    let {firstName, lastName, email, password} = req.body;

    try{
        //check to see if user is already in db
        let records = await UserModel.find({email: email}) //[{}, {}]
        console.log(records.length)

        if(records.length == 0){
            //create a new user record

            //ecrypt password 

            password = bcrypt.hashSync(password, 8)
            console.log(password)

            //create db entry 

            let newUserRecord = await UserModel.create({firstName, lastName, email, password})
            // {id, email, password, createdAt, updatedAt}
            


            // create jwt 
            let jwtToken = token(newUserRecord)
            console.log(jwtToken)

            //return jwt 

            return res.json({token: jwtToken, userId: req.user._id})

        }
        else{
            //user's email already exists in our db, so send back and error message to react

            return res.status(422).json({error: "Email already exists"})

        }

    }
    catch(error){

        // can't access db
        console.log(error)
        return res.status(432).json({error: "Can't access database"})


    }

})

router.post('/login', requireLogin, (req, res)=>{
    //req.user
    console.log(`inside login ${req.user._id}`);
//     console.log("inside authinticatioj login")
//    let  {email, password} = req.body
//     UserModel.findOne({email, password})
    res.json({token:token(req.user), userId: req.user._id})
})

router.get('/protected', requireJwt, (req, res)=>{
    res.json({isValid: true})
})


//to add to favorite backend route
router.post("/addFav", async (req, res)=>{
    let {name, street, city, state, userIdFromRedux} = req.body;
    try {
          //create db entry 

        //   let newFavRecord = await FavoriteModel.create({name, street, city, state, userIdFromRedux})
        //   console.log(newFavRecord);
        //   return res.json(newFavRecord)

        const newFavSpots = new FavoriteModel({name, street, city, state, userIdFromRedux})
        await newFavSpots.save()
        res.json(newFavSpots)
    } catch (error) {
        return res.status(422).json({error: "Can't create new record for the fav spot"})
    }
})

//!to get favorite backend route
router.post("/favSpot", async (req, res)=>{
    //get the data based on user_id
    let {userIdFromLocalStorage} = req.body
    console.log("in favspot auth", userIdFromLocalStorage);
    try {
        let records = await FavoriteModel.find({userIdFromLocalStorage}) //[{}, {}]
        // console.log("in favspot authen", records);
        return res.json(records)
    } catch (error) {
        console.log(error)
        return res.status(432).json({error: "Can't access Favorite database"})
    }
   
    //send the data back to front end /favorites
})

//to delete a spot fron fav backend route
router.post("/deleteFavSpot", async (req, res)=>{
    //find and delete the spot based on restroom _id
    let obj = req.body.obj

    console.log("inside delete route", obj);
    // try {
    //     let deletedRecord = await FavoriteModel.findOneAndDelete({_id: restroomId})
      
    //     console.log(deletedRecord);
    //     // res.json(deletedRecord)
    //     res.send("delete a record")
    // } catch (error) {
    //     console.log(error)
    //     return res.status(432).json({error: "Can't delete in the db"})
    // }
})



router.post('/profilepage', async (req, res)=>{
  
    const {userId} = req.body
    console.log(userId)
  
    try {
        let id = userId.userId
        let records = await UserModel.findById(userId) //[{}, {}]
        console.log(records)
        return res.json(records)
        

        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router