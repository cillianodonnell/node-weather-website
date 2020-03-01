const request = require( 'request' );

const forecast = ( latitude, longitude, callback ) =>
{
    const url = 'https://api.darksky.net/forecast/0248130d16b481fb6847f895e1b5cb51/'
                + latitude + ',' + longitude + '?units=si';

    request( {url, json: true}, (error, {body}) =>
    {
        if ( error )
        {
            callback( 'Unable to connect to weather service.', 
                       undefined );
        }
        else if ( body.error )
        {
            callback( 'Unable to find location.', undefined );
        }
        else
        {
            const temperature = body.currently.temperature;
            const precip_probability = body.currently.precipProbability;
            callback( undefined,
                      body.daily.data[0].summary
                      + ' It is currently ' + temperature
                      + ' degrees out. There is a '
                      + precip_probability + '% chance of rain.'
                      + 'Highest temperature today is '
                      +  body.daily.data[0].temperatureHigh
                      + '. Lowest temperature is '
                      + body.daily.data[0].temperatureLow );
        }
    });
}
module.exports = forecast;