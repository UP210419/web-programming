const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('secondas');
const formAlarm = document.getElementById('form-alarm');
let alarmDate;

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('alarmita') !== null) {
        const input = formAlarm.children[0];
        // yyyy-mm-ddTh:mm

        localStorage.getItem('alarmita');
        const AlarmaFormato = new Date(localStorage.getItem('alarmita'));
        const alarmYear = AlarmaFormato.getFullYear();
        const alarmMonth = AlarmaFormato.getMonth();
        const alarmDay = AlarmaFormato.getDate();
        const alarmHours = AlarmaFormato.getHours();
        const alarmMinutes = AlarmaFormato.getMinutes();

        console.log(AlarmaFormato.getFullYear() + "-" + formatNumber(AlarmaFormato.getMonth()) + "-" + formatNumber(AlarmaFormato.getDate()));

        input.value = ""; 
        //{alarmYear}-${formatNumber(alarmMonth)}-${formatNumber(alarmDay)};
        //input.value = new Date(localStorage.getItem('alarmita')).toISOString;
    }    

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

    const currentDate = new Date();
    const setAlarm = new Date(value);

    if (isValidDate(currentDate, setAlarm)) {
        alert("Fecha invalida!!!");
        return;
    }

    console.log(setAlarm);
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

function isValidDate(currentDate, setAlarm) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const alarmYear = setAlarm.getFullYear();
    const alarmMonth = setAlarm.getMonth();
    const alarmDay = setAlarm.getDate();
    const alarmHours = setAlarm.getHours();
    const alarmMinutes = setAlarm.getMinutes();

    const añoAlarmaEsMenor = alarmYear < currentYear;
    const añoAlarmaIgual = alarmYear === currentYear; 
    const mesAlarmaEsMenor = alarmMonth < currentMonth; 
    const mesAlarmaIgual = alarmMonth === currentMonth; 
    const diaAlarmaEsMenor = alarmDay < currentDay; 
    const diaAlarmaIgual = alarmDay === currentDay; 
    const horaAlarmaEsMenor = alarmHours < currentHours; 
    const horaAlarmaIgual = alarmHours === currentHours; 
    const minutosAlarmaEsMenorIgual = alarmMinutes <= currentMinutes;

    return (
        añoAlarmaEsMenor || 
        añoAlarmaIgual && mesAlarmaEsMenor || 
        añoAlarmaIgual && mesAlarmaIgual && diaAlarmaEsMenor || 
        añoAlarmaIgual && mesAlarmaIgual && diaAlarmaIgual && horaAlarmaEsMenor || 
        añoAlarmaIgual && mesAlarmaIgual && diaAlarmaIgual && horaAlarmaIgual && minutosAlarmaEsMenorIgual
    )
}

function formatNumber(value) {
     if (value < 10) {
         return "0"+ value;
     } else {
         return value;
     }
}
