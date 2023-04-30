const path = require("node:path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./src/utils/forecast")

const app = express()

const publicDir = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, "/templates/views")
const partialsPath = path.join(__dirname, "/templates/partials")

app.use(express.static(publicDir))

hbs.registerPartials(partialsPath)

setViews(app, {
    viewEngine: "hbs",
    viewsPath
})

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        subTitle: "Home",
        name: "Manuel"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        subTitle: "About us",
        name: "Manuel"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        subTitle: "Help page",
        message: "We are here to help you",
        name: "Manuel"
    })
})

app.get("/forecast", (req, res) => {

    if (!req.query.address)
        return res.send({error: "Write a location!"})

    forecast.query({
        query: req.query.address,
        handler: (error, response, body) => {
            const finalResponse = {
                error: null,
                body: null
            }

            if (error) {
                finalResponse.error = `An error has occurred calling host: ${error?.hostname}: ${error}`
            } else if (response.body.error) {
                finalResponse.error = response.body?.error
            } else {
                finalResponse.body = body
            }

            return res.send(finalResponse)
        }
    });
})

app.get("/products", (req, res) => {
    if (!req.query.search)
        return res.send({
            error: "Debes ingresar un termino para busqueda"
        })

    return res.send({
        products: []
    })
})


app.get("/help/*", (req, res) => {
    res.render("help_404", {title: "Help not found"})
})


app.get("*", (req, res) => {
    res.render("404", {
        title: "Not found",
        subTitle: "404"
    })
})

app.listen(3000, () => {
    console.log("server start")
})

/**
 * Set express application view engine an path
 * @param app
 * @param viewsPath
 * @param viewEngine
 */
function setViews(app, {viewEngine, viewsPath}) {

    app.set("view engine", viewEngine)
    app.set("views", viewsPath)
}