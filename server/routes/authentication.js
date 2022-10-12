const express = require('express');
const router = express.Router();
const db = require('../models/Users');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const passport = require('passport');


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
    return jwt.encode({sub:userRecord.id, iat:timestamp}, secrets.secrets)
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

    let {firstName, lastName, email, password} = req.body;

    try{
        //check to see if user is already in db
        let records = await db.users.find({email: email}) //[{}, {}]

        if(records.length == 0){
            //create a new user record

            //ecrypt password 

            password = bcrypt.hashSync(password, 8)

            //create db entry 

            let newUserRecord = await db.users.create({firstName, lastName, email, password})
            // {id, email, password, createdAt, updatedAt}


            // create jwt 
            let jwtToken = token(newUserRecord)

            //return jwt 

            return res.json({token: jwtToken})

        }
        else{
            //user's email already exists in our db, so send back and error message to react

            return res.status(422).json({error: "Email already exists"})

        }

    }
    catch(error){

        // can't access db

        return res.status(432).json({error: "Can't access database"})

    }

})

router.post('/login', requireLogin, (req, res)=>{
    //req.user
    res.json({token: token(req.user)})
})

router.get('/protected', requireJwt, (req, res)=>{
    res.json({isValid: true})
})

module.exports = router