# Tools 

- https://www.npmjs.com/package/node-tweet-stream

# nodemon

Can be used to restart server whenever server side files change.

```npm install -g nodemon```

Usage:

```nodemon server.js```

Usage

# Courses

## Socket.io

- https://app.pluralsight.com/library/courses/socket-io-building-real-time-applications/table-of-contents

Explains:
- how to set up socket.io with ```express```
- how to send / receive messages/events (```socket.emit/on```)
- how to write a chat
 - broadcast events to all sockets ```io.emit```
 - broadcast to all except myself ```socket.broadcast.emit```
 - broadcast to particular socket ```socket.broadcast.to```
 - disconnecting works (```disconnect``` event)



