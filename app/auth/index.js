'use strict';
const passport = require('passport');
const config = require('../config')
const FacebookStrategy =  require('passport-facebook').Strategy

const h = require('../helpers')

module.exports = () =>{
passport.serializeUser((user, done)=>{
  done(null, user.id)
});
passport.deserializeUser((id, done)=>{
  h.findById(id)
    .then(user => done(null, user))
    .catch(e => console.log('error deserializeUser',e))
})

let authProcessor = (accessToken, refreshToken, profile, done)=>{
  h.findOne(profile.id)
    .then(result =>{
        if(result){
          done(null, result)
        } else {
          // createNewUser
          h.createNewUser(profile)
            .then(newChatUser => done(null, newChatUser))
            .catch(e => console.log('Error creating user',e))
        }
    }).catch(e => console.log('error finding user'))
}

  passport.use(new FacebookStrategy(config.fb, authProcessor))
}
