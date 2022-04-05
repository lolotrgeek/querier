const { buildAPI, startAPI, startlocalAPI } = require('./index')
const express = require('express')
const https = require('https')
const url = require('url')
const fs = require('fs')
const certificate = fs.readFileSync('localhost.pem')
const key = fs.readFileSync('localhost-key.pem')
// guide to setup local testing
// https://simplyenable.notion.site/How-to-use-HTTPS-for-local-development-e1e9f9d683d04d49b32bbb24d5e39f78


// START TEST API // 
// creates a test api server to model a "real" api server
const app = express()
const port = 9000

app.get('/', (req, res) => {
    const queryObject = url.parse(req.url, true).query
    console.log('query:', queryObject)
    if (queryObject.test === "hello") {
        let response = { hello: "world"}
        res.send(JSON.stringify(response))
    } else {
        res.send("failed")
        res.end( () => {
            console.log("FAILED.")
            process.exit()
        })
    }
})

https.createServer({
    key: key,
    cert: certificate
}, app).listen(port, () => {
    console.log(`App listening at ${port}`)
})
// END TEST API //

// Build a query to send to test api server
const buildTestQuery = query => {
    if (query.message) return `https://localhost:9000?test=${query.message}`
}

const buildAsyncTestQuery = query => {
    if (query.message) return Promise.resolve(`https://localhost:9000?test=${query.message}`)
}

// Build an api to wrap the test api using find-request pattern.
// run this query to initalize test : http://localhost/?message=hello
function testAPI() {
    let params = {
        route: '/',
        type: "test"
    }
    buildAPI(params, buildTestQuery, data => {
        if(data.hello === 'world' ) {
            console.log('PASSED!')
            process.exit()
        }
        return data
    })
    startlocalAPI()
    // startAPI()
}

function testAsyncAPI() {
    let params = {
        route: '/',
        type: "test"
    }
    buildAPI(params, buildAsyncTestQuery, data => {
        if(data.hello === 'world' ) {
            console.log('PASSED!')
            process.exit()
        }
        return data
    })
    startlocalAPI()
    // startAPI()
}
// testAsyncAPI()
testAPI()