"use strict"
let h = require('../helpers/index')
const passport = require('passport');

module.exports = () =>{
  let routes = {
    'get': {
      '/': (req, res, next) =>{
        res.render('login')
      },
      '/rooms': (req, res, next)=>{
        res.render('rooms')
      },
      '/chat': (req, res, next )=>{
        res.render('chatroom')
      },
      '/auth/facebook':  passport.authenticate('facebook'),

      '/auth/facebook/callback': passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
    },
    'post': {

    },
    'NA': (req, res, next)=>{
      res.status(404).sendFile(process.cwd() + '/views/404.htm')
    }
  }

  //iterate through the routes object
  return  h.routes(routes)
}
