# Tools 

- https://www.npmjs.com/package/node-tweet-stream

# express-generator

```npm install -g express-generator```

Usage:

```express <nameOfTheProject>```

# nodemon

Can be used to restart server whenever server side files change.

```npm install -g nodemon```

Usage:

```nodemon server.js```

Usage

# Courses

## Twitter

- https://app.pluralsight.com/library/courses/building-realtime-angular-controls/table-of-contents

Shows how to use pubnub for twitter event stream (just a few lines of code)

## Socket.io

- https://app.pluralsight.com/library/courses/socket-io-building-real-time-applications/table-of-contents
 - https://github.com/jakblak/socketio-demos

Explains:
- how to set up socket.io with ```express```
- how to send / receive messages/events (```socket.emit/on```)
- how to write a chat
 - broadcast events to all sockets ```io.emit```
 - broadcast to all except myself ```socket.broadcast.emit```
 - broadcast to particular socket ```socket.broadcast.to(socketid)```
 - broadcast to group of sockets (channel) with ```socket.join(channel)``` & ```socket.broadcast.to(channel)```
 - disconnecting works (```disconnect``` event)

## OAuth & Passport

- https://app.pluralsight.com/library/courses/oauth-passport-securing-application/table-of-contents

- shows how to generate express application
- how to configure passport middleware

## passport

```npm install passport --save```

Plugging passport in:

```
// passport.session requires express-session
var session = require('express-session');

app.use(session({secret: 'my-secret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeuser(function(user, done) {
  done(null, user);
});

passport.deserializeuser(function(user, done) {
  done(null, user);
});

```

