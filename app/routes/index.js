"use strict"
let h = require('../helpers')
const passport = require('passport');

module.exports = () =>{
  let routes = {
    'get': {
      '/': (req, res, next) =>{

        res.render('login')
      },
      '/rooms': [h.isAuthenticated, (req, res, next)=>{
        res.render('rooms', {
          user: req.user
        })
      }],
      '/chat': [h.isAuthenticated, (req, res, next )=>{
        res.render('chatroom' , {
          user: req.user
        })
      }],
      '/auth/facebook':  passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms',
        failureRedirect: '/',
       }),
       '/auth/twitter': passport.authenticate('twitter'),
       '/auth/twitter/callback': passport.authenticate('twitter', {
         successRedirect: '/rooms',
         failureRedirect: '/'
       }),
       '/logout': (req, res)=>{
         req.logout()
         res.redirect('/')
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
