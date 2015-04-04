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
- simple solution with query string parameter that holds list of fields & ExpandoObject (C#)



> Written with [StackEdit](https://stackedit.io/).