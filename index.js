const hari = new Date();

// -------------------------------- current
function current(){
    const now = hari
    const hour = now.getHours()
    if (hour < 12) {
        return 'Good Morning';
    } else if (hour < 16) {
        return 'Good Afternoon';
    } else if (hour < 21) {
        return 'Good Evening';
    } else {
        return 'Good Night';
    }
}
// -------------------------------- Get Hari
function getHari(date,type){
    const options = {
        weekday: type
    };
    return date.toLocaleDateString("en-EN", options);
}
// -------------------------------- Get Tanggal
function getTanggal(date){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString("en-EN", options);
}
// -------------------------------- Get Waktu
function getWaktu(date){
    const options = {
        hour: "2-digit",
        minute: "2-digit"
    };
    return date.toLocaleTimeString("en-EN", options);
}
// -------------------------------- Get Position
function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude, " ");
}
// -------------------------------- Get Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
}
getLocation();

async function getCity(){
    try {
        const city = document.getElementById("city").value;
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        const response = await fetch(url);
        const data = await response.json();
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        document.querySelector(".hidden").style.display = "none";
        getWeather(latitude, longitude, city);
        document.getElementById("city").value = "";
    } catch (err) {
        alert("Data tidak ditemukan");
    } finally {
        console.log("done");
    }
}

// -------------------------------- Get Weather
async function getWeather(latitude, longitude, city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&&hourly=temperature_2m,weather_code`
        const response = await fetch(url);
        const data = await response.json();
        // document.querySelector(".hidden").style.display = "block";
        const currentTime                = data.current.time;
        const currentInterval            = data.current.interval+" "+data.current_units.interval;
        const currentTemperature         = `${parseInt(data.current.temperature_2m)}º`;
        const currentRelativeHumidity    = data.current.relative_humidity_2m+""+data.current_units.relative_humidity_2m;
        const currentApparentTemperature = parseInt(data.current.apparent_temperature)+"º";
        const currentIsDay               = data.current.is_day+""+data.current_units.is_day;
        const currentPrecipitation       = data.current.precipitation+" "+data.current_units.precipitation;
        const currentRain                = `<h3 class="font-weight-600" id="current-rain">${data.current.rain} <small><small style="font-size:9px;">${data.current_units.rain}</small></small></h3>`;
        const currentShowers             = `<h3 class="font-weight-600" id="current-rain">${data.current.showers} <small><small style="font-size:9px;">${data.current_units.showers}</small></small></h3>`;
        const currentSnowfall            = `<h3 class="font-weight-600" id="current-rain">${data.current.snowfall} <small><small style="font-size:9px;">${data.current_units.snowfall}</small></small></h3>`;
        const currentWeatherCode         = data.current.weather_code;
        const currentCloudCover          = data.current.cloud_cover+""+data.current_units.cloud_cover;
        const currentWindSpeed           = data.current.wind_speed_10m+" "+data.current_units.wind_speed_10m;
        const currentWindDirection       = data.current.wind_direction_10m+""+data.current_units.wind_direction_10m;
        const currentWindGusts           = data.current.wind_gusts_10m+" "+data.current_units.wind_gusts_10m;

        const currentWeather             = wmo[currentWeatherCode].description;
        const currentDesc                = `Cloud cover ${currentCloudCover}. Relative humidity is ${currentRelativeHumidity}. Precitipation ${currentPrecipitation}. Winds direction ${currentWindDirection} at ${currentWindSpeed} and ${currentWindGusts} gusts. Interval ${currentInterval}`

        document.querySelector("#current").innerHTML = current() + ' ' + city;
        document.querySelector("#current-weather").innerHTML = currentWeather;
        document.querySelector("#current-desc").innerHTML = currentDesc;
        // document.querySelector("#current-rain").innerHTML = currentRain;
        // document.querySelector("#current-showers").innerHTML = currentShowers;
        // document.querySelector("#current-snowfall").innerHTML = currentSnowfall;

        document.querySelector("#current-temperature").innerHTML = currentTemperature;
        document.querySelector("#current-apparent-temperature").innerHTML = "Feels like "+ currentApparentTemperature;
        document.querySelector("#today-img-div").innerHTML = `<img src="${wmo[data.current.weather_code].image}" width="100%">`;
        document.querySelector("#today-hari").innerHTML = getHari(new Date(data.current.time),"long");
        document.querySelector("#today-date").innerHTML = getTanggal(new Date(data.current.time));
        document.querySelector(".hidden").style.display = "block";


        // HOURLY-----------------------------------------------------------
        document.getElementById("current-hourly").innerHTML = ``
        for (let i = 0; i < 24; i++) {
            document.getElementById("current-hourly").innerHTML += 
            `<div class="card glass-effect mt-4" style="min-width:80px;max-width:80px;background:none;margin-right:10px;">
                <div class="card-body pt-4">
                    <div class="d-flex flex-column position-relative text-center" style="height:100%">
                        <img class="" src="${wmo[data.hourly.weather_code[i]].image}" style="margin:auto; width:40px;height:auto;">
                        <b>${parseInt(data.hourly.temperature_2m[i])}º</b>
                        <div class="position-absolute start-50 translate-middle glass-effect" style="top:-20px;padding:2px 5px;border-radius:7px;">
                            <small><small><b>${data.hourly.time[i].split("T")[1]}</b></small></small>
                        </div>
                    </div>
                </div>
            </div>`
        }

        // DAILY-----------------------------------------------------------

        document.getElementById("daily").innerHTML = ``
        data.daily.time.forEach((el, i) => {
            if(i>0){
                document.getElementById("daily").innerHTML += `
                <div class="d-flex modal-hover" data-bs-target="#myModal${i}" data-bs-toggle="modal">
                    <div class="p-2 flex-grow-1" style="text-align:left;"><small>${getHari(new Date(data.daily.time[i]),"short")}</small></div>
                    <div class="p-2"><b>${parseInt(data.daily.temperature_2m_max[i])}º</b></div>
                    <img class="next-img" src="${wmo[data.daily.weather_code[i]].image}" style="margin:auto; width:50px;height:auto;">
                </div>
                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content glass">
                            <div class="modal-body">
                                <div class="d-flex w-100 justify-content-between">
                                    <img class="modal-img" src="${wmo[data.daily.weather_code[i]].image}">
                                    <div class="text-end align-middle">
                                        <h5 id="today-hari">${getHari(new Date(data.daily.time[i]),"long")}</h5>
                                        <p id="today-date">${getTanggal(new Date(data.daily.time[i]))}</p>
                                        <h2 class="card-title font-size-100 font-weight-700">${parseInt(data.daily.temperature_2m_max[i])}º</h2>
                                        <p style="">${parseInt(data.daily.temperature_2m_min[i])}º - ${parseInt(data.daily.temperature_2m_max[i])}º</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        })
    } catch (error) {
        console.log(error);
    }
}