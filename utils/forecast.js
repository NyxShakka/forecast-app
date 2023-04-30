const request = require("postman-request");

const ACCESS_KEY = "40d8189a281510fedf8eedd257a9bbc0";
const BASE_URL = "http://api.weatherstack.com/current"


let options =
    {
        url: BASE_URL,
        qs: {access_key: ACCESS_KEY},
        json: true
    }

const query = ({query, handler}) => {
    options.qs.query = query
    request(options, (error, response, body) => {
        handler(error, response, body)
    })
}

const print = ({current: {temperature, precip}, location: {country, name}}, lang = "esp") => {
    switch (lang) {
        case "spa":
            return console.log(`La temperatura en ${name}, ${country} es de ${temperature} ºC con ${precip}% de probabilidad de lluvia`);
        case "eng":
        default:
            return console.log(`The temperature in ${name}, ${country} is ${temperature} ºC with ${precip}% chance of rain`);
    }
}

const printSpanish = (query) => print(query, "spa");
const printEnglish = (query) => print(query, "eng");

module.exports = {
    query
}