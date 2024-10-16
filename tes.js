function getWeather(){
    const urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=Jakarta&count=1&language=en&format=json`

    const city = fetch(urlCity).then(res => res.json()).then(data => {
        const latitude = Math.floor(data.results[0].latitude * 100) / 100;
        const longitude = Math.floor(data.results[0].longitude * 100) / 100;
        const longLat = [latitude,longitude]
        // console.log(longLat)
        // return longLat
        // const urlWeather = 'https://api.open-meteo.com/v1/forecast?latitude='+longLat[0]+'&longitude='+longLat[1]+'&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,temperature_80m,is_day'
        // fetch(urlWeather).then(response => response.json()).then(data => {
        //     console.log(data)
        // })
        // .catch(error => {
        //     console.error("Error fetching forecast:", error);
        // });
    })
    console.log(city)
    
}

getWeather();
// const coordinate = [dataCoordinate.latitude,dataCoordinate.longitude]
// console.log(dataCoordinate)