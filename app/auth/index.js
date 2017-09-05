'use strict';
const passport = require('passport');
const config = require('../config')
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../db')
const h = require('../helpers')

module.exports = () =>{
passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  h.findById(id)
    .then(user => done(null, user))
    .catch(e => console.log('Error deserializeUser', e))
})

let authProcessor = (accessToken, refreshToken, profile, done)=>{
  // find user in DB
  h.findOne(profile.id)
    .then(result =>{
      if(result){
        done(null, result)
      } else {
        //result not found therefore create a new user
        h.createNewUser(profile)
          .then(newChatUser => done(null, newChatUser))
          .catch(err => console.log(err))
      }
    })

}

passport.use(new FacebookStrategy(config.fb, authProcessor))
}
