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

dummyCelcius = ['12º','24º','26º','24º','26º','24º']
const nextCelcius = document.querySelectorAll(".next-celcius");
nextCelcius.forEach((item,index) => {
    item.innerHTML = dummyCelcius[index];
});