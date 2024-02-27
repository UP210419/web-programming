const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('secondas');
const formAlarm = document.getElementById('form-alarm');
let alarmDate;

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTime();
});

setInterval(function() {
    getCurrentTime();
}, 1000);

formAlarm.addEventListener('submit', function(e) {
    e.preventDefault();
    //console.log(e.currentTarget);
    // Acceder al DOM

    //new FormData(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    const value = formData.get('time');

    if (value === null || value === "") {
        alert("Establezca una fecha, no sea menso!!!!");
        return; 
    }


    alarmDate = new Date(value);
    //console.log(alarmDate);
});

function getCurrentTime() {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    console.log(alarmDate);

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

function formatNumber(value) {
     if (value < 10) {
         return "0"+ value;
     } else {
         return value;
     }

    // if (value < 10) {
    //     return "0" + value; 
    // }
 
    // return value;

    // Ternaria -> if en una sola línea 
    //return value < 10 
    // ? "0" + value
    // : value; 
}


