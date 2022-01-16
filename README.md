# Queriest
Make an API of APIs!

## Purpose
Reduce calls to exterior APIs by caching data and re-rerouting.

## Pattern ( find-request)
First try to find data locally, if unavailable make an api call.

- setup queries, with parameters
- run queries, retrieve and cache data
- build route to access data