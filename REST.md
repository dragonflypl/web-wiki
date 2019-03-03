# REST

## REST Levels

Depending on how RESTful your API is, there're four levels (Richardson's maturity level):
- level 0 - wild wild west (no notion of resources, for instance returning html snippets for angular, pure RPC calls)
- level 1 - adds notions of resources
- level 2 - utilizes http verbs
- level 3 - adds HATEOAS

## REST Constraints:

- Client <-> Server - separation of client & server.
- Stateless server: everything what is needed to process the request should be included in the request
- Caching - let the client know how long data is good so the client does not have to go to the server all the time
- Uniform Interface (identical communication between all clients & servers) - for RESTful interface has 4 pieces:
  - Resource (nouns)
  - Resource identifier
  - Resource metadata
  - Representation
  - Hypermedia: HATEOAS - in each request we have a set hyperlinks that can be used to navigate with API
- Layered Systems - client must no nothing about server dependencies on other systems

Links:
- http://imasters.expert/rest-architecture-model-definition-constraints-benefits/
- https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
- http://ruben.verborgh.org/blog/2012/08/24/rest-wheres-my-state/ - why RESTful applications are stateless (TODO!) - (for scaling)

## Status Codes

- POST: 201/400/500
- GET/PUT/PATCH: 200/404/400/500
- DELETE: 204/404/400/500
- General:
 - 401 (unauthorized)
 - 403 (forbidden)
 - 405 (method not allowed)

## Filtering / Sorting

- simple solution with query string params that specify order & where clause

## Pagination

- simple solution with query string (page/page size) + adding links to prev/next in headers

## Shaping the data

- inclusion of fields: simple solution with query string parameter that holds list of fields & ExpandoObject (C#)
- collections inclusion
- projections - e.g. in Spring Data REST there're named projections. eg http://api/people/1?projection=lite

## Caching

- ETag: identifies version of the resource. Use it with:
 - ```If-None-Match ETag```: client sends it to server along with ETag, for instance with GET
 - ```If-Match ETag```: for updates. In case when client is working with outdated version, 412 should be returned

## Versioning

- through URI
 - http://domain/api/resource
 - http://domain/api/v2/resource
- content negotiation: custom Content Type in request's Accept header
- custom request header: custom version header added to request, containing version number

## CORS (Cross-Origin resource sharing)

CORS must be enabled if RESTful API is not hosted with the client.

## Rate Limiting

Mechanism to prevent flooding the server with too many request from single client. 

## Securing API

- user/password with each request
- user/password with exchange for token , and token used
- OAuth (Google , FB etc.)

<hr />

## Sample API

### List

- url: http://localhost:8000/api/books
- demonstrates HATEOAS with links

```
[
  {
    "_id": "569653723dd819338a4016c5",
    "title": "War and Peace",
    "genre": "Historical Fiction",
    "author": "Lev Nikolayevich Tolstoy",
    "read": false,
    "links": {
      "self": "http:\/\/localhost:8000\/api\/books\/569653723dd819338a4016c5"
    }
  },
  {
    "_id": "569653723dd819338a4016c6",
    "title": "Les Mis\u00e9rables",
    "genre": "Historical Fiction",
    "author": "Victor Hugo",
    "read": false,
    "links": {
      "self": "http:\/\/localhost:8000\/api\/books\/569653723dd819338a4016c6"
    }
  }
]
```

### GET by id

- url: http://localhost:8000/api/books/569653723dd819338a4016c5

```
{
  "_id": "569653723dd819338a4016c5",
  "title": "War and Peace",
  "genre": "Historical Fiction",
  "author": "Lev Nikolayevich Tolstoy",
  "read": false,
  "links": {
    "FilterByThisGenre": "http:\/\/localhost:8000\/api\/books\/?genre=Historical%20Fiction"
  }
}
```

### List with filter

- url: http://localhost:8000/api/books/?genre=Historical%20Fiction

```
[
  {
    "_id": "569653723dd819338a4016c5",
    "title": "War and Peace",
    "genre": "Historical Fiction",
    "author": "Lev Nikolayevich Tolstoy",
    "read": false,
    "links": {
      "self": "http:\/\/localhost:8000\/api\/books\/569653723dd819338a4016c5"
    }
  },
  {
    "_id": "569653723dd819338a4016c6",
    "title": "Les Mis\u00e9rables",
    "genre": "Historical Fiction",
    "author": "Victor Hugo",
    "read": false,
    "links": {
      "self": "http:\/\/localhost:8000\/api\/books\/569653723dd819338a4016c6"
    }
  }
]
```

## Hypermedia in REST

- HATEOAS
- HAL is HATEOAS implementation
- ALPS - applications can expose metadata profile that describes the application semantics using ALPS specification (Aplication Level Profile Semantics). ALPS describes resource attributes, related operations and their semantics
- JSON Schema

## Links

- <https://www.youtube.com/watch?time_continue=20&v=kTmqc7Cnqlw> - cool video on REST and how it comes from SOA and Data oriented design
- http://restful-api-design.readthedocs.org/en/latest/methods.html#patch-vs-put - Patch Vs Put
- <https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api> - super cool guidelines on API best practives with HTTP examples of implementation (like caching, filtering, sorting, searching, relationships, basically everything)

## FAQ

- plural vs singular resource names?
  - According to google udacity course, it's recommended to use PLURAL form for each resource name
