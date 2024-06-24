const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { hasSubscribers } = require('diagnostics_channel')
const app = express()
// const port=processs.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static dictionary to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Ashik'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Ashik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Daniel Ashik'
    })
})



app.get('/Weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
        return res.send({error})
        }
        res.send({

            forecast:forecastData,
            location,
            address:req.query.address
        })
    })
})



    // res.send({
    //     forecast:'It is Summer Season',
    //     location:'France',
    //     address:req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search tearm'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Ashik',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Daniel Ashik',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server port is up on ')
})