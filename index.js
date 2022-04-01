require('./src/lib')
const express = require('express')
const app = express()
const port = process.env.PORT || 80
const url = require('url')
const { find } = require('node-data-finder')

// query to frontAPI, build query from query, send to 

function parseQuery(req) {
    const incomingQuery = url.parse(req.url, true).query
    console.log("incomingQuery", incomingQuery)
    return incomingQuery
}

function handleError(err, res) {
    if (err) {
        console.log(err)
        res.send(JSON.stringify(err))
    }
}

function runFind(result, res, callback) {
    let response = callback(result)
    console.log("response", response)
    res.send(JSON.stringify(response))
}

function findTypes(params, outgoingQuery, res, callback) {
    let timeout = params.timeout ? params.timeout : new Date().addDays(1)
    console.log(params.type, outgoingQuery)
    find(params.type, outgoingQuery, timeout).then(result => runFind(result, res, callback)).catch(err => handleError(err, res))
}

/**
 * 
 * @param {object} params `route`, `type`, `timeout`
 * @param {function} buildQuery
 * @param {function} callback
 */
function buildAPI(params, buildQuery, callback) {
    if (!params.route) params.route = "/"
    app.get(params.route, (req, res) => {
        const incomingQuery = parseQuery(req, buildQuery)
        if (incomingQuery.type) params.type = incomingQuery.type
        if (incomingQuery.clear) params.type = incomingQuery.clear
        else if(incomingQuery[params.type_alias]) params.type = incomingQuery[params.type_alias]

        if (typeof params.type !== 'string') res.send(JSON.stringify({ error: "invalid incomingQuery." }))
        let outgoingQuery = buildQuery(incomingQuery)
        console.log("outgoingQuery", outgoingQuery)
        if (!outgoingQuery) res.send(JSON.stringify({ error: "invalid outgoingQuery." }))
        else findTypes(params, outgoingQuery, res, callback)
    })
}

function startAPI() {
    app.listen(port, () => {
        console.log(`App listening at ${port}`)
    })
}

/**
 * @WARNING only run for local tests, SUPER UNSAFE!
 */
function startlocalAPI() {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    startAPI()
}

module.exports = { buildAPI, startAPI, startlocalAPI }