## What is GraphQL

It is a query language for any data.

Data is described with schema.

Usage:
- use it when your API aggregates many APIs
- when you need to shape responses

## Realtime with GraphQL subscriptions

> https://www.youtube.com/watch?v=Wi7P39sF2nw

`gql` (GraphQL) offers Subscriptions mechanism (pub/sub) that enables realtime (push) notifications even without reactive backend. Very powerful as:
- server describes what events and what data it exposes
- client can decide which events he's interested in and what data he would like to receive

It's an alternative to live queries (like firebase or graphql-rxjs `@live`) or long pooling.

Reactive datasources for like queries can be `firestore`,`rethinkdb`, `meteor`, mongo 3.6 changestream `mongo-rxjs`

Resources:
- apollographql/subscriptions-transport-ws
- apollographql/graphql-subscriptions
- dxcx/graphql-rxjs
- urigo/mongo-rxjs
- urigo/meteor-rxjs

### Scaling

Read about redis & kafka
## GraphQL code generator 

> https://github.com/dotansimha/graphql-code-generator

TODO - read about it

## Documentation

By creating schema, documentation is automatically generated

## Apollo Client 2.0 and Apollo Angular 1.0

READ ABOUT IT - 

What it offers:
- basically everything graphql over backend server has to offer, but in the client (you can query rxjs, local storage etc)
- client side schema
- schema stitching (e.g. one schema gets data from clientside localstorage, second from the server, but quering is done like it was single schema / single data source, so basically merging together many schemas)
- components get the shape of the data they need ( open question: what about typings? )
- typings
- with this client you don't even need graphql server / middleware. you can talk to regular http/rest server

There's a plugin for chrome : Apollo Client Dev Tools

## Integration questions

### Angular 

### ngrx

### TypeScript

## Resources

- Complete example
  - https://github.com/urigo/whatsapp-clone-graphql-angular-material
  - https://github.com/Urigo/whatsapp-server-graphql-live-rxjs-meteor

- Uri Goldshtein search on YT for this guy, he talks about GraphQL
- https://www.youtube.com/watch?v=UBGzsb2UkeY basic & short example of how to set up nodejs graphql endpoint
- https://www.youtube.com/watch?v=uhsFulxaVqc high level overview and technology possibilties (Angular Connect)
