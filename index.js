const hari = new Date();

// -------------------------------- Greeting
function greeting(){
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

document.querySelector("#greeting").innerHTML = greeting();
document.querySelector("#greeting-hari").innerHTML = getHari(new Date(),"long");
document.querySelector("#greeting-date").innerHTML = getTanggal(new Date());



// const elements = document.querySelectorAll('.next-day');
// Array.from(elements).forEach((element, index) => {
//   element[index].innerHTML('Testimonial '+(index+1)+' by each loop');
//   alert(index)
// });

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



// function updateDateTime() {
//     const now = new Date();
//     const currentDateTime = now.toLocaleString();
//     document.querySelector('#datetime').textContent = currentDateTime;
// }
// setInterval(updateDateTime, 1000);

// function updateDateTime1() {
//     date = addDate(1);
//     document.querySelector('#datetime1').textContent = date;
// }
// setInterval(updateDateTime1, 1000);

// function updateDateTime2() {
//     date = addDate(2);
//     document.querySelector('#datetime2').textContent = date;
// }
// setInterval(updateDateTime2, 1000);

// function updateDateTime3() {
//     date = addDate(3);
//     document.querySelector('#datetime3').textContent = date;
// }
// setInterval(updateDateTime3, 1000);

// function updateDateTime4() {
//     date = addDate(4);
//     document.querySelector('#datetime4').textContent = date;
// }
// setInterval(updateDateTime4, 1000);

// function updateDateTime5() {
//     date = addDate(5);
//     document.querySelector('#datetime5').textContent = date;
// }
// setInterval(updateDateTime5, 1000);

// function updateDateTime6() {
//     date = addDate(6);
//     document.querySelector('#datetime6').textContent = date;
// }
// setInterval(updateDateTime6, 1000);