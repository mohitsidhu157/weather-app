const request = require("request");

const forecast = (lattitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=127907536788a5b3c4e298de6788a955&units=metric`;
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else {
            const { temp } = body.main;
            callback(undefined, body.main);
        }
    })
}

module.exports = forecast;