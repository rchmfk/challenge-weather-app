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

document.querySelector("#today").innerHTML = today();
// alert(getHari(new Date(),"long"))
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