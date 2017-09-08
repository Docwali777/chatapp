"use strict"
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express()
const PORT = process.env.PORT || 3000
const logger = require('morgan')
const passport = require('passport');

const chatCat = require('./app/index')

// app.use(logger('dev'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(chatCat.session)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', chatCat.router)


chatCat.ioServer(app).listen(PORT, ()=>{
  console.log(`ChatApp server on port: ${PORT}`);
})
