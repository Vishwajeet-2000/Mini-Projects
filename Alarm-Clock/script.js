const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

let alarmTime;
let isAlarmSet = false;
let ringtone = new Audio("./files/ringtone.mp3")

for(let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i; 
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for(let i = 59; i > 0; i--){
    i = i < 10 ? "0" + i : i; 
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval( ()=>{
    // getting hour, minute, secs
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h = h -12;
        ampm= "PM"
    }

    //If hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h

    //adding 0 before ht, min, sec this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h} : ${m} : ${s} ${ampm}`;
    
    if(alarmTime == `${h}:${m} ${ampm}`){
        console.log("Alarm Ringing");
        
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);

function setAlarm(){

    if(isAlarmSet){ //If isSetAlarm is set true
        alarmTime = ""; // Clear the value of alarmTime
        ringtone.pause(); // pause the ringtone
        content.classList.remove("disable")
        setAlarmBtn.innerText = "Set Alarm"
        return isAlarmSet = false; // return isSetAlarm value to false
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!")
    }

    isAlarmSet = true;

    alarmTime = time;

    content.classList.add("disable")
    setAlarmBtn.innerText = "Clear Alarm"
}

setAlarmBtn.addEventListener("click", setAlarm)