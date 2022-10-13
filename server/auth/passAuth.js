const passport = require('passport');
const UserModel = require("../models/Users")

const LocalStrategy = require('passport-local').Strategy; //local strategy 
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

//access db

const db = require('../models/Users'); //access to all models in the db 

//bcrypt 
const bcrypt = require('bcryptjs');

//secret file for JWT 

const secrets = require('../secrect1');


/**
 * Local Strategy 
 ** Determine if user email and password are correct by checking what's inside of db
 */

 let options = {
     usernameField: 'email'
 }

 let localLogin = new LocalStrategy(options, async (email, password, done)=>{
console.log(email, password, "inside local")

    try{
        //check if email is in our db 

        let records = await UserModel.find({email: email})  //[{}, {}, {}]

        if(records !== null){
            // if the email was found 

            bcrypt.compare(password, records[0].password, (err, isMatch)=>{

                if(err){
                    return done(err) // error found by bcrypt
                }

                if(!isMatch){
                    return done(null, false) // no auth because passwords didn't match
                }

                return done(null, records[0]) //match was found, send record 
                // req.user

            })

        }
        else{
            // no email was found

            //exit with no error 

            return done(null, false)
        }
    }
    catch(error){

        //can't access database 
        return done(error)

    }
 })


 /**
  * JWT Strategy
  * * check to see if token if valid
  */

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
    secretOrKey: secrets.secrets 
}

let jwtLogin = new JwtStrategy(jwtOptions, async (payload, done)=>{

    try{

        let userID = payload.sub 

        //check if user is in db

        let user = await UserModel.findById(userID);  //{} or null 

        if(user){
            return done(null, user) //place the user object on req.user
            //req.user  = {id, email, password}
        }
        else{
            //no user found
            return done(null, false)

        }
    }
    catch(error){
        //error reading db 

        return done(error)
    }
    
})

//add strategies to middleware chain 

passport.use(localLogin); 
passport.use(jwtLogin);