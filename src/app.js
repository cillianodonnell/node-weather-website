const path = require( 'path' );
const express = require( 'express' );
const hbs = require( 'hbs' );
const geocode = require( './utils/geocode' );
const forecast = require( './utils/forecast' );

const app = express();

// Define paths for Express config
const public_directory_path = path.join( __dirname, '../public' );
const views_path = path.join( __dirname, '../templates/views' );
const partials_path = path.join( __dirname, '../templates/partials' );

// Handlebars setup and views location
app.set( 'view engine', 'hbs' );
app.set( 'views', views_path );
hbs.registerPartials( partials_path );

// Setup static directory to serve
app.use( express.static(public_directory_path) );

app.get( '', (req, res) =>
{
    res.render( 'index',
    {
        title: 'Weather',
        name: 'Cillian O\'Donnell'
    } );
})
app.get( '/about', (req, res) =>
{
    res.render( 'about',
    {
        title: 'About Me',
        name: 'Cillian O\'Donnell'
    });
})
app.get( '/help', (req, res) =>
{
    res.render( 'help',
    {
        help_message: 'A message that is helpful',
        title: 'Help',
        name: 'Cillian O\'Donnell'
    })
})
app.get( '/weather', (req, res) =>
{
    if ( !req.query.address )
    {
        return res.send(
            {
                error: 'You must provide an address'
            }
        )
    }
    geocode( req.query.address, (error, {latitude, longitude, location}={}) =>
    {
        if ( error )
        {
            return res.send( {error} );
        }
        forecast( latitude, longitude, (error, current_forecast) =>
        {
            if ( error )
            {
                return res.send( {error} );
            }
            res.send( 
            {
                forecast: current_forecast,
                location,
                address: req.query.address
            } );
        })
    })
})
app.get( '/products', (req, res) =>
{
    if ( !req.query.search )
    {
        return res.send(
            {
                error: 'You must provide a search term'
            }
        )
    }
    console.log( req.query.search );
    res.send( 
        {
            products: []
        }
    )
})
app.get( '/help/*', (req, res) =>
{
    res.render( 'error_404',
    {
        error: "Help article not found",
        title: '404 Not Found',
        name: 'Cillian O\'Donnell'
    });
})
app.get( '*', (req, res) =>
{
    res.render( 'error_404',
    {
        error: "Page not found.",
        title: '404 Not Found',
        name: 'Cillian O\'Donnell'
    });
})

app.listen( 3000, () =>
{
    console.log( 'Server is running on port 3000' );
})