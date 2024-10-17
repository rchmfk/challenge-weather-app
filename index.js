const hari = new Date();

// -------------------------------- today
function today(){
    const now = new Date()
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

// function dateFormatted(date) {
//     const options = {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     };
//     const dateFormatted = new Date(date);
//     return dateFormatted.toLocaleDateString("id-ID", options);
// }

const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.291458125315&longitude=106.91251756430&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant"

{/* <script src="https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c.js"></script> */}

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // alert(data.current)
        today()
        document.querySelector("#today").innerHTML = today();
        document.querySelector("#today-hari").innerHTML = getHari(new Date(data.current.time),"long");
        document.querySelector("#today-date").innerHTML = getTanggal(new Date(data.current.time));
        document.querySelector("#today-temperature").innerHTML = data.current.temperature_2m+"º";
        document.querySelector("#today-desc").innerHTML = `
        <small>
        interval: ${data.current.interval}<br/>
        relative_humidity_2m: ${data.current.relative_humidity_2m}<br/>
        temperature_2m: ${data.current.temperature_2m}<br/>
        apparent_temperature: ${data.current.apparent_temperature}<br/>
        is_day: ${data.current.is_day}<br/>
        rain: ${data.current.rain}<br/>
        showers: ${data.current.showers}<br/>
        weather_code: ${data.current.weather_code}<br/>
        wind_speed_10m: ${data.current.wind_speed_10m}<br/>
        wind_direction_10m: ${data.current.wind_direction_10m}<br/>
        wind_gusts_10m: ${data.current.wind_gusts_10m}<br/>
        </small>
        `
        ;

        data.daily.time.forEach((el, i) => {
            if(i>0){
                document.getElementById("tes").innerHTML += `
                <a href="#myModal${i}" data-bs-toggle="modal" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="card-text next-day">${getHari(new Date(data.daily.time[i]),"short")}</p>
                        <img class="next-img" src="assets/small-Sun.png">
                    </div>
                    <h3 class="card-title next-celcius">${data.daily.temperature_2m_max[i]}º</h3>
                    <small><small class="next-date">${getTanggal(new Date(data.daily.time[i]))}</small></small>
                </a>
                <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content glass">
                            <div class="modal-body">
                                <div class="d-flex w-100 justify-content-between">
                                    <img class="modal-img" src="assets/small-Sun.png">
                                    <div class="text-end align-middle">
                                        <small class="modal-title modal-day">${getHari(new Date(data.daily.time[i]),"short")}</small><br/>
                                        <small class="modal-title modal-date">${getTanggal(new Date(data.daily.time[i]))}</small><br/>
                                        <h2 class="card-title modal-celcius">${data.daily.temperature_2m_max[i]}º</h2>
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
getWeather();


// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail