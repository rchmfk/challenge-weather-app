const hari = new Date();

// -------------------------------- today
function today(){
    const now = new Date()
    const hour = now.getHours()
    if (hour < 12) {
        return 'Good Morning';
    } else if (hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}
// -------------------------------- Get Day
function getHari(date,type){
    const options = {
        weekday: type
    };
    return date.toLocaleDateString("en-EN", options);
}
function getTanggal(date){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString("en-EN", options);
}

function addDate(add){
    const date = new Date();
    date.setDate(date.getDate() + add);
    return date;
}

document.querySelector("#today").innerHTML = today();
document.querySelector("#today-hari").innerHTML = getHari(new Date(),"long");
document.querySelector("#today-date").innerHTML = getTanggal(new Date());

const nextDay = document.querySelectorAll(".next-day");
nextDay.forEach((item,index) => {
    item.innerHTML = getHari(addDate((index+1)),"short");
});
const nextDate = document.querySelectorAll(".next-date");
nextDate.forEach((item,index) => {
    item.innerHTML = getTanggal(addDate((index+1)));
});
const dummyCelcius = ['12º','24º','26º','24º','26º','24º']
const nextCelcius = document.querySelectorAll(".next-celcius");
nextCelcius.forEach((item,index) => {
    item.innerHTML = dummyCelcius[index];
});

const modalDay = document.querySelectorAll(".modal-day");
modalDay.forEach((item,index) => {
    item.innerHTML = getHari(addDate((index+1)),"short");
});
const modalDate = document.querySelectorAll(".modal-date");
modalDate.forEach((item,index) => {
    item.innerHTML = getTanggal(addDate((index+1)));
});
const modalCelcius = document.querySelectorAll(".modal-celcius");
modalCelcius.forEach((item,index) => {
    item.innerHTML = dummyCelcius[index];
});

function today(){
    
}

function next6Day(){
}


function getWeather(){
    const urlCity = `https://geocoding-api.open-meteo.com/v1/search?name=Jakarta&count=1&language=en&format=json`

    fetch(urlCity).then(res => res.json()).then(data => {
        const latitude = Math.floor(data.results[0].latitude * 100) / 100;
        const longitude = Math.floor(data.results[0].longitude * 100) / 100;
        const longLat = [latitude,longitude]
        const urlWeather = 'https://api.open-meteo.com/v1/forecast?latitude='+longLat[0]+'&longitude='+longLat[1]+'&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m,temperature_80m,is_day'
        fetch(urlWeather).then(response => response.json()).then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
        });
    })
}
getWeather()



























    // alert(result)

    // fetch(urlWeather)
    //     .then(response => response.json())
    //     .then(data => {
    //         alert(data.latitude)
    //         // console.log("5-Day Forecast for", data);
    //         // displayForecast(data);
    //     })
    //     .catch(error => {
    //         console.error("Error fetching forecast:", error);
    //     });
    
    // const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
    //     console.log(data)
        // city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        // datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
        // weather__forecast.innerHTML = `<p>${data.weather[0].main}`
        // weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        // weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        // weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        // weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        // weather__humidity.innerHTML = `${data.main.humidity}%`
        // weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
        // weather__pressure.innerHTML = `${data.main.pressure} hPa`
    // })
