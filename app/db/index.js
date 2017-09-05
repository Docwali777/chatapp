const config = require('../config')
const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise

//create a user schema
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
})
//create user model
let userModel = Mongoose.model('chatUser', chatUser)

Mongoose.connect(config.dbURI, {useMongoClient: true})
                  .then(()=>console.log('mLAB connected'))
                  .catch(e => console.log('mLab ERROR connecting', e))

module.exports = {
  Mongoose,
  userModel
}
