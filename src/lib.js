/**
 *  Add Hours to date
 * @param {number} hours 
 * @returns 
 */
Date.prototype.addHours = function (hours) { this.setTime(this.getTime() + (hours * 60 * 60 * 1000)); return this }

/**
 * Creates a filtered copy of an object
 * @param {object} object 
 * @param {array} allowed list of allowed keys
 * @returns 
 */
Object.prototype.filter = function (object, allowed) {
    return Object.keys(object)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: object[key]
            }
        }, {})
}

/**
 * 
 * @param {number} days 
 * @returns 
 */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

/**
 * Find Max value in array of integers
 * @param {*} array 
 * @returns 
 */
Array.max = function (array) {
    return Math.max.apply(Math, array)
}

/**
 * 
 * @param {array} array of objects with a key holding a numerical value
 * @param {string} key of value to find maximum of
 * @returns max value of objects
 */
Array.maxObject = function(array, key) {
    return Math.max.apply(Math, array.map(function(o) { return o[key] }))
}

/**
 * 
 * @param {array} array of objects with a key holding a numerical value
 * @param {string} key of value to find maximum of
 * @returns object that contains max value
 */
 Array.maxObjectValue = function(array, key) {
    let max = Array.maxObject(array, key)
    return array.find(o => parseInt(o[key]) === max)
}