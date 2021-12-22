const { buildAPI, startAPI, startlocalAPI } = require('./index')
const express = require('express')
const https = require('https')
const url = require('url')
const fs = require('fs')
const certificate = fs.readFileSync('localhost.pem')
const key = fs.readFileSync('localhost-key.pem')
// guide to setup local testing
// https://simplyenable.notion.site/How-to-use-HTTPS-for-local-development-e1e9f9d683d04d49b32bbb24d5e39f78

const app = express()
const port = 9000

app.get('/', (req, res) => {
    const queryObject = url.parse(req.url, true).query
    console.log('query:', queryObject)
    if (queryObject.test === "hello") {
        let response = { hello: "world" }
        res.send(JSON.stringify(response))
    } else {
        res.send("failed")
    }
})

https.createServer({
    key: key,
    cert: certificate
}, app).listen(port, () => {
    console.log(`App listening at ${port}`)
})

const buildTestQuery = query => {
    if (query.message) {
        return `https://localhost:9000?test=${query.message}`
    }
}

// run this query to initalize test : http://localhost/?message=hello

function testAPI() {
    let params = {
        route: '/',
        type: "test"
    }
    buildAPI(params, buildTestQuery, data => {
        return data 
    })
    startlocalAPI()
    // startAPI()
}
testAPI()