# Queriest
Make an API of APIs!

## Purpose
Reduce calls to exterior APIs by caching data and re-rerouting.

## How to Works
Wraps an existing API with an API that can cache data.

### Pattern ( find-request)
First try to find data locally, if unavailable make an api call.

- setup queries, with parameters
- run queries, retrieve and cache data
- build route to access data


## Usage
see example.

Data is cached by type in `./data` directory. Default timeout is 1 day.

## Example
```
const { buildAPI, startAPI } = require('queriest')

let params = {}
// the route this api will post data on
params.route = "/"

// parses incoming query and returns an outgoing query
const build_cat_query = incoming_query => {
    // http://localhost/?type=fact
    if(incoming_query.type === "fact")  return `https://catfact.ninja/fact`
    
    // NOTE! must have `type` as an argument of incoming query or have type set statically with `params` ...
    
    // http://localhost/?kitten=facts
    if(incoming_query.kitten === "facts")  return `https://catfact.ninja/facts`
     
    // ... or have an alias set in the `params`
}

buildAPI(params, build_cat_query, data => {
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
- use promise instead of callback
- document functions
