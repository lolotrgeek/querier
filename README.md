# Queriest
Make an API of APIs!

## Purpose
Reduce calls to exterior APIs by caching data and re-rerouting.

## Pattern ( find-request)
First try to find data locally, if unavailable make an api call.

- setup queries, with parameters
- run queries, retrieve and cache data
- build route to access data


## Usage
```
    const { buildAPI, startAPI } = require('queriest')

    let params = {}

    // the route this api will post data on
    params.route = "/" 

    // type of data this api posts (important for finding in cache)
    params.type = "test"

    query = "https://catfact.ninja/fact"

    buildAPI(params, query, data => {
        if(data) {
            console.log(data)
            return data
        }
    })
    startAPI()
```

## Test
```
node test
```
Navigate to http://localhost/?message=hello

## Todo
- multiple routes on api
- default set route to type, remove route param as required
- use promise instead of callback