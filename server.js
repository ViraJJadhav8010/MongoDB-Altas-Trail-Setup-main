const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.use(express.static(path.join(__dirname, './pages')))

// Pages to shows

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/home.html'))
})

app.get('/allocationView', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/home.html'))
})

app.get('/avalibilityFile', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/avalibilityFile.html'))
})

app.get('/avalibilityView', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/avalibilityView.html'))
})

app.get('/fileView', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/fileView.html'))
})

app.get('/planDetails', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/planDetails.html'))
})

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/registration.html'))
})

app.get('/serviceProviderLogin', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/serviceProviderLogin.html'))
})

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
