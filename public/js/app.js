const weather_form = document.querySelector( 'form' );
const search = document.querySelector( 'input' );
const message_one = document.querySelector( '#message-1')
const message_two = document.querySelector( '#message-2')


weather_form.addEventListener( 'submit', (e) =>
{
    e.preventDefault();
    const location = search.value;

    message_one.textContent = 'Loading...';
    message_two.textContent = '';

    fetch( 'http://localhost:3000/weather?address='+location ).then( (response) =>
    {
        response.json().then( (data) =>
        {
            if ( data.error )
            {
                return message_one.textContent = data.error;
            }
            message_one.textContent = data.location;
            message_two.textContent = data.forecast;
        })
    })
})