const hari = new Date();

// -------------------------------- today
function today(){
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
    getWeather(latitude, longitude, ' ');
}
// -------------------------------- Get Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
}
getLocation();

// -------------------------------- Get City
async function getCity(){
    try {
        const city = document.getElementById("city").value;
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        const response = await fetch(url);
        // alert(response)
        const data = await response.json();
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        getWeather(latitude, longitude, city);
        document.getElementById("city").value = "";
    } catch (err) {
        alert("Data tidak ditemukan");
    } finally {
        console.log("done");
    }
}

function myFunction(){
    alert('tes');
}



// -------------------------------- Get Weather
async function getWeather(latitude, longitude, city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&&hourly=temperature_2m,weather_code`
        const response = await fetch(url);
        const data = await response.json();
        document.querySelector(".hidden").style.display = "block";
        
        // CURRENT---------------------------------------------------------

        document.querySelector("#today").innerHTML = today() + '<br>' + city;
        document.querySelector("#today-hari").innerHTML = getHari(new Date(data.current.time),"long");
        document.querySelector("#today-date").innerHTML = getTanggal(new Date(data.current.time))+", "+getWaktu(new Date(data.current.time));
        document.querySelector("#today-date").innerHTML = getTanggal(new Date(data.current.time));
        document.querySelector("#today-temperature").innerHTML = parseInt(data.current.temperature_2m)+"º";
        document.querySelector("#today-temperature2").innerHTML = "Feels like "+parseInt(data.current.apparent_temperature)+"º";
        document.querySelector("#today-img-div").innerHTML = `<img src="${wmo[data.current.weather_code].image}" height="300px" >`;
        
        
        document.getElementById("today-desc").innerHTML = `
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Interval</small></small>
                        <h3 class="card-title">${data.current.interval}</h3>
                        <small><small>${data.current_units.interval}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Relative Humidity</small></small>
                        <h3 class="card-title">${data.current.relative_humidity_2m}</h3>
                        <small><small>${data.current_units.relative_humidity_2m}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Precipitation</small></small>
                        <h3 class="card-title">${data.current.precipitation}</h3>
                        <small><small>${data.current_units.precipitation}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Cloud Cover</small></small>
                        <h3 class="card-title">${data.current.cloud_cover}</h3>
                        <small><small>${data.current_units.cloud_cover}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Wind Speed</small></small>
                        <h3 class="card-title">${data.current.wind_speed_10m}</h3>
                        <small><small>${data.current_units.wind_speed_10m}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Wind Direction</small></small>
                        <h3 class="card-title">${data.current.wind_direction_10m}</h3>
                        <small><small>${data.current_units.wind_direction_10m}</small></small>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <small class="me-auto" style="margin-top:auto;margin-bottom:auto;"><small>Wind Gusts</small></small>
                        <h3 class="card-title">${data.current.wind_gusts_10m}</h3>
                        <small><small>${data.current_units.wind_gusts_10m}</small></small>
                    </div>
                </div>
            </div>
        `;

        // HOURLY-----------------------------------------------------------
        document.getElementById("current-hourly").innerHTML = ``
        for (let i = 0; i < 24; i++) {
            document.getElementById("current-hourly").innerHTML += `
            <div class="list-group-item list-group-item-action flex-column align-items-start text-center" style="min-width:150px;">
            <p class="card-text next-day">${data.hourly.time[i].split("T")[1]}</p>
            <p class="card-title next-celcius">${parseInt(data.hourly.temperature_2m[i])}º</p>
                <img class="" src="${wmo[data.hourly.weather_code[i]].image}" style="width:100%;margin:auto;margin-bottom:-20px;">
                <small><small>${wmo[data.hourly.weather_code[i]].description}</small></small>
            </div>
            `
        }

        // DAILY-----------------------------------------------------------

        document.getElementById("daily").innerHTML = ``
        data.daily.time.forEach((el, i) => {
            if(i>0){
                document.getElementById("daily").innerHTML += `
                <div data-bs-target="#myModal${i}" data-bs-toggle="modal" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <b class="card-text next-day" style="margin:auto;">${getHari(new Date(data.daily.time[i]),"short")}</b>
                        <h7 class="card-text next-celcius" style="margin:auto;">${parseInt(data.daily.temperature_2m_max[i])}º</h7>
                        <img class="next-img" src="${wmo[data.daily.weather_code[i]].image}" style="margin:auto;">
                    </div>
                </div>
                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content glass">
                            <div class="modal-body">
                                <div class="d-flex w-100 justify-content-between">
                                    <img class="modal-img" src="${wmo[data.daily.weather_code[i]].image}">
                                    <div class="text-end align-middle">
                                        <small class="modal-title modal-day">${getHari(new Date(data.daily.time[i]),"short")}</small><br/>
                                        <small class="modal-title modal-date">${getTanggal(new Date(data.daily.time[i]))}</small><br/>
                                        <h2 class="card-title modal-celcius">${parseInt(data.daily.temperature_2m_max[i])}º</h2>
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

// async function getWeather() {
//     try {
//         const response = await fetch(url2);
//         if (!response.ok) {
//             throw new Error("Failed to fetch weather data");
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     } finally {
//         console.log("done");
//     }
// }