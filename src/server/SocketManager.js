const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events.js');
const { createUser, createMessage, createChat } = require('../Factories.js');

let connectedUser = { };

module.exports = socket => {
  console.log('Socket Id: ' + socket.id);
};

//Verify Username
io.on(VERIFY_USER, (nickname, callback) => {
  if (isUser(connectedUser, nickname)) {
    callback({ isUser: true, user: null });
  }else {
    callback({ isUser: false, user: createUser({ name: nickname }) });
  }
});

//User Connects with username
io.on(USER_CONNECTED, (user) => {
  connectedUsers = addUser(connectedUsers, user);
  socket.user = user;
  io.emit(USER_CONNECTED, connectedUsers);
  console.log(connectedUsers);
});

//User Disconnects

//User Logs out

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userlist, username) {
  return username in userList;
}
