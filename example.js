const { buildAPI, startAPI } = require('./index')

let params = {}
// the route this api will post data on
// params.route = "/"

// parses incoming query and returns an outgoing query
const build_cat_query = incoming_query => {
    // http://localhost/?type=fact
    if(incoming_query.type === "fact")  return `https://catfact.ninja/fact`
    
    // http://localhost/?type=facts
    if(incoming_query.type === "facts")  return `https://catfact.ninja/facts`
    
    // NOTE! must have `type` as an argument of incoming query or have it set in `params` 
    
}

buildAPI(params, build_cat_query, data => {
    if(data) {
        console.log(data)
        return data
    }
})
startAPI()