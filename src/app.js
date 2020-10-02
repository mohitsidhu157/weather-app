const path = require("path");
const express = require("express");
const hbs = require("hbs")

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express();

// Define paths for express config
const publicPathName = path.join(__dirname, "..", "/public")
const templatePath = path.join(__dirname, "../templates", "/views")
const partialsPath = path.join(__dirname, "../templates", "/partials")

// Setup handlebars engine and views location
app.set("view engine", 'hbs')
app.set("views", templatePath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicPathName))

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Andrew Mead"
	})
})

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Andrew Mead"
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		message: "help message",
		name: "Andrew Mead",
		title: "Help page"
	})
})

app.get("/weather", (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: "Please provide an address"
		})
	}

	geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
				error
			})        
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
					error
				}) 
            }
            console.log(location)
            console.log('Data', forecastData)

            return res.send({
				forecastData,
				location
			}) 
        })
    })

	// res.send({
	// 	address: req.query.address
	// })
})

app.get("/products", (req, res) => {
	if(!req.query.search){
		return res.send({
			error: "Please send a search query"
		})
	}
	console.log("req", req.query)
	res.send({ products : ["Weather page"]})
})

app.get("/help/*", (req, res) => {
	res.render("notFound", {
		errorMessage: "help page not found",
		name: "Andrew Mead",
		title: "Help page"
	})
})
app.get("*", (req, res) => {
	res.render("notFound", {
		errorMessage: "404 page not found",
		name: "Andrew Mead",
		title: "Help page"
	})
})

app.listen(3000, () => {
	console.log("Server is listening at port 3000")
})