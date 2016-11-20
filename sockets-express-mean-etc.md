# Tools 

## Mock HTTP

- Nock: for nodejs, useful in unit tests, it hijackes all requests
- switching to Static JSON
- development web servers
 - api-mock
 - JSON Server: create fake database using static JSON. Starting JSON server creates web service that operates on JSON files
 - JSON Schema Faker: generates fake data, uses faker.js / chance.js / randexp.js to create random data.

## small

- chalk: console.log messages with colours
- npm-run-all: tool to run scripts with npm scripts , e.g. in parallel

## twitter streams

- https://www.npmjs.com/package/twitter-stream-api
- https://www.npmjs.com/package/node-tweet-stream

## http-servers

- express / koa / hapi

## sharing work in progress

- localtunnel , ngrok , now , surge

## express-generator

```npm install -g express-generator```

Usage:

```express <nameOfTheProject>```

## nodemon

Can be used to restart server whenever server side files change.

```npm install -g nodemon```

Usage:

```nodemon server.js```

# Courses

## Express

- https://app.pluralsight.com/library/courses/nodejs-express-web-applications/table-of-contents


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
- to to authenticate
- how to consume API with tokens 

### how it works

On google:
- create google application in google console (configure needed authorizations + url/redirects)
- use generated ids from google console (authid etc) and use them in express
- authenticate
- store returned profile along with access token
- use access token along with ```OAuth``` package to consume API

### passport

```npm install passport passport-twitter passport-google-auth OAuth --save```

Plugging passport in:

```
// passport.session requires express-session
var session = require('express-session');

app.use(session({secret: 'my-secret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

```


