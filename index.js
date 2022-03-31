require('./src/lib')
const express = require('express')
const app = express()
const port = process.env.PORT || 80
const url = require('url')
const { find } = require('node-data-finder')

// query to frontAPI, build query from query, send to 

/**
 * 
 * @param {object} params `route`, `query`, `type`
 * @param {*} buildQuery
 */
function buildAPI(params, buildQuery, callback) {
    if (typeof params.route === 'string') {
        app.get(params.route, (req, res) => {
            const incomingQuery = url.parse(req.url, true).query
            let outgoingQuery = buildQuery(incomingQuery)
            console.log("outgoingQuery", outgoingQuery)
            if (!outgoingQuery) res.send(JSON.stringify({ error: "invalid outgoingQuery." }))

            // Look for cached data based on type, execute query if cannot find
            else find(outgoingQuery, params.type, new Date().addDays(1)).then(result => {
                let response = callback(result)
                console.log("response", response)
                res.send(JSON.stringify(response))
            }).catch(err => { console.log(err); res.send(JSON.stringify(err)) })

        })
    }
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