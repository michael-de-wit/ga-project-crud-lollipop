// Packages, connections
const dotenv = require('dotenv'); // in order to use .env
dotenv.config() // in order to use .env

const express = require(`express`) // in order to use Express
const app = express() // in order to use Express

const { default: mongoose } = require('mongoose'); // in order to use mongoose to connect with MongoDB
mongoose.connect(process.env.MONGODB_URI) // connect to MongoDBusing the info in .env
mongoose.connection.on(`connected`, () => { // connect to MongoDB
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})
const methodOverride = require(`method-override`) // to make DELETE, PUT requests work
// const morgan = require(`morgan`) // for HTML request info in the console

app.use(express.urlencoded({ extended: false })); // expect user input data from forms
app.use(methodOverride(`_method`)) // to make DELETE, PUT requests work
// app.use(morgan(`dev`)) // for HTML request info in the console

const path = require('path'); // Set up public folder
app.use(express.static(path.join(__dirname, 'public'))); // Set up public folder

// Schema
const conditionStateComparisonData = require(`./models/conditions.js`) // use this MongoDB schema

// Connections
app.get (`/`, async (req, res) => { // GET request for the index route
    const allData = await conditionStateComparisonData.find()
    res.render(`home.ejs`, {
        dataPoints: allData,
    })
})

// Listening
const portNumber = 3000
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})