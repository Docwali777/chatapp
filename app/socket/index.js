'user strict'
const h = require('../helpers')

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatRooms', () => {
      socket.emit('chatRoomsList', allrooms)
    })
    socket.on('createNewRoom', (newRoomInput) => {
      //check if room exists

      if (!h.findRoomByName(allrooms, newRoomInput)) {
        allrooms.push({room: newRoomInput, roomID: h.randomHex(), users: []})
        socket.emit('chatRoomsList', allrooms)
        socket.broadcast.emit('chatRoomsList', allrooms)
      }

    })

  })

  io.of('/chatter').on('connection', socket => {
    socket.on('join', data => {
      let userList = h.addUserToRoom(allrooms, data, socket)
      if (userList !== undefined) {
        // socket.join(data.roomID)

        socket.broadcast.to(data.roomID).emit('updateUserList', JSON.stringify(userList.users))
        socket.emit('updateUserList', JSON.stringify(userList.users))
      }
    })

    socket.on('newMessage', data => {
console.log(socket.rooms)
      let {roomID} = data

      // console.log(data);
      socket.broadcast.to(roomID).emit('inMessage', data)
    })

    //disconnect
    socket.on('disconnect', () => {
      //disconnect from the particular room
      let room = h.removeUserFromRoom(allrooms, socket)

      if (room.roomID !== undefined) {

        socket.broadcast.to(room.roomID).emit('updateUserList', JSON.stringify(room.users))
      }
    })


  })
}
