# REST

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

## Caching
- ETag: identifies version of the resource. Use it with:
 - ```If-None-Match ETag```: client sends it to server along with ETag, for instance with GET
 - ```If-Match ETag```: for updates. In case when client is working with outdated version, 412 should be returned

## Versioning
- through URI
 - http://domain/api/resource
 - http://domain/api/v2/resource
- content negotiantion: custom Content Type in request Accept Header
- custom request header: custom version header added to request, containing version number

## CORS (Cross-Origin resource sharing)
CORS must be enabled if RESTful API is not hosted with the client.

<hr />

> Written with [StackEdit](https://stackedit.io/).