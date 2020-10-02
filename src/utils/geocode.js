const request = require("request")

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJjZGVmdCIsImEiOiJja2VoNnpjYmExNnkzMnJveTYxb3l3aXc0In0.AtTlwb2wtIpHDWtcKpftLQ&limit=1`

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect ", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search ", undefined)
        } else {
            const [longitude, lattitude] = body.features[0].center;
            const place_name = body.features[0].place_name
            callback(undefined, {
                longitude,
                lattitude,
                location: place_name
            })
        }
    })
}

module.exports = geocode